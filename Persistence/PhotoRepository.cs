using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using car.Core;
using car.Core.Models;

namespace car.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository(VegaDbContext context)
        {
          this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
          return await context.Photos
            .Where(p => p.VehicleId == vehicleId)
            .ToListAsync();
        }        
    }
}