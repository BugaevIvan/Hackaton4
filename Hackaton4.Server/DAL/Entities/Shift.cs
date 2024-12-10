using System.ComponentModel.DataAnnotations;

namespace Hackaton4.Server.DAL.Entities
{
    public class Shift
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartShiftDate { get; set; }
        public DateTime EndShiftDate { get; set; }
    }
}
