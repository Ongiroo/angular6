using Microsoft.EntityFrameworkCore.Migrations;

namespace car.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) Values ('Make1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) Values ('Make2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) Values ('Make3')");
            
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make1-ModelA', (SELECT ID FROM Makes WHERE Name = 'Make1'))");            
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make1-ModelB', (SELECT ID FROM Makes WHERE Name = 'Make1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make1-ModelC', (SELECT ID FROM Makes WHERE Name = 'Make1'))");
        
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make2-ModelA', (SELECT ID FROM Makes WHERE Name = 'Make2'))");            
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make2-ModelB', (SELECT ID FROM Makes WHERE Name = 'Make2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make2-ModelC', (SELECT ID FROM Makes WHERE Name = 'Make2'))");
        
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make3-ModelA', (SELECT ID FROM Makes WHERE Name = 'Make3'))");            
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make3-ModelB', (SELECT ID FROM Makes WHERE Name = 'Make3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Make3-ModelC', (SELECT ID FROM Makes WHERE Name = 'Make3'))");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('Make1', 'Make2', 'Make3')");
            // we don't need delete Models. When Makes is deleted, its associated Models are going to be deleted.
            // migrationBuilder.Sql("DELETE FROM Models");
        }
    }
}
