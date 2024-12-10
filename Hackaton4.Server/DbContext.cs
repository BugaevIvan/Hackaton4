using Microsoft.EntityFrameworkCore;
using rusal.Server.DAL.Entities;

public class AppDbContext : DbContext
{
    public DbSet<Accommodation> Accommodations { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasData(new User
        {
            Id = Guid.NewGuid(),
            Username = "admin",
            PasswordHash = "$2a$11$dPXdFwxoU/poSCAwtYwYPeb5sapv4U4eWF7Cdpc/Jjwqje4bIc9eW"
        });
    }
}
