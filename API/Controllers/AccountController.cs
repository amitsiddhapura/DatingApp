using System.Security.Cryptography;
using System.Text;
using System.Text.Unicode;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext datacontext;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext datacontext, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this.datacontext = datacontext;
        }

        [HttpPost("createUser")]
        public async Task<ActionResult<UserDto>> CreateNewUser(RegisterDto registerdto)
        {

            if(await UserExists(registerdto.UserName))
                return BadRequest("Username is already taken");

            using var hmac= new HMACSHA512();

            var user = new AppUser()
            {
                UserName=registerdto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerdto.Password)),
                PasswordSalt = hmac.Key        
            };

            datacontext.Users.Add(user);
            await datacontext.SaveChangesAsync();
            return new UserDto(){
                Username= registerdto.UserName,
                Token = _tokenService.GetJwtToken(user)
            };             
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginUser(LoginDto logindto)
        {

            var user = await datacontext.Users.FirstOrDefaultAsync<AppUser>(s=>s.UserName == logindto.Username);

            if(user == null)
                return Unauthorized("invalid username");

            using HMACSHA512 hmac = new HMACSHA512(user.PasswordSalt);
            var hashvalue = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

            for(int i=0; i< hashvalue.Length; i++)
            {
                if(user.PasswordHash[i]!= hashvalue[i])
                {
                    return Unauthorized("invalid password");        
                }
            }

            return new UserDto()
            {
                Username= user.UserName,
                Token = _tokenService.GetJwtToken(user)
            };  
        }

        private async Task<bool> UserExists(string username)
        {
            return await datacontext.Users.AnyAsync(s=>s.UserName == username.ToLower()); 
        }

    }
}