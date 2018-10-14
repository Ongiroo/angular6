using System.Threading.Tasks;
using car.Core.Models;

namespace car.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true); 
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}