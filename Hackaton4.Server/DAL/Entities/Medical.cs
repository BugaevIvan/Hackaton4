using System.ComponentModel.DataAnnotations;

namespace Hackaton4.Server.DAL.Entities
{
    public class Medical
    {
        [Key]
        public int Id { get; set; }

        public DateOnly StartMedicalDate { get; set; }
        public string Reason { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
