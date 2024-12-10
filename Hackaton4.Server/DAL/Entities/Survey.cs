using System.ComponentModel.DataAnnotations;

namespace Hackaton4.Server.DAL.Entities
{
    public class Survey
    {
        [Key]
        public int Id { get; set; }
        public string Questions { get; set; } = null!;
        public string TypeAnswer { get; set; } = null!;
        public string TargetAudience { get; set; } = null!;
    }
}
