﻿using System.ComponentModel.DataAnnotations;

namespace rusal.Server.DAL.Entities
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;
    }
}
