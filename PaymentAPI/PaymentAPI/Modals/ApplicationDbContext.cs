using Microsoft.EntityFrameworkCore;

namespace PaymentAPI.Modals
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)   
        {
            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=PaymentDetails;Username=postgres;Password=3117");
        }

        public DbSet<PaymentDetail> PaymentDetails { get; set; }
    }
}
