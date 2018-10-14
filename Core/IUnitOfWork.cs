using System.Threading.Tasks;

namespace car.Core
{
    public interface IUnitOfWork {
        Task CompleteAsync();
    }
}