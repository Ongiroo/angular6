using System.Collections.Generic;
using System.Threading.Tasks;
using car.Core.Models;

namespace car.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}