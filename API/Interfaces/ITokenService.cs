using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        
        string GetJwtToken(AppUser user);

    }
}