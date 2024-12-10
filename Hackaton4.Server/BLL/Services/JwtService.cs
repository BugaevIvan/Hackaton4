using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace rusal.Server.BLL.Services
{
    public class JwtService
    {
        private string securityKey = "my-secret-key-shits-motherfucker-new-down";
        public string Generate(Guid id)
        {
            //Claim[] claims = [new("userId", id.ToString())];
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var header = new JwtHeader(credentials);
            var payload = new JwtPayload(id.ToString(), null, null, null, DateTime.UtcNow.AddHours(1));

            var securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(securityKey);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);
            return (JwtSecurityToken)validatedToken;
        }
    }
}
