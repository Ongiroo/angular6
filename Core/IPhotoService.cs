using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using car.Core.Models;

namespace car.Core
{
    public interface IPhotoService
    {
         Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}