using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using car.Core;
using car.Core.Models;
using car.Extentions;


namespace car.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
              .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle) 
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();

            var query = context.Vehicles
              .Include(v => v.Model)
                .ThenInclude(m => m.Make)
              .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .AsQueryable();

            // sorting on server -- Version 1 ---
           /*             
            if (queryObj.SortBy == "make")
               query=(queryObj.IsSortAscending) ? query.OrderBy(v=>v.Model.Make.Name) : query.OrderByDescending(v=>v.Model.Make.Name);
            if (queryObj.SortBy == "model")
               query=(queryObj.IsSortAscending) ? query.OrderBy(v=>v.Model.Name) : query.OrderByDescending(v=>v.Model.Name);
            if (queryObj.SortBy == "contactName")
               query=(queryObj.IsSortAscending) ? query.OrderBy(v=>v.ContactName) : query.OrderByDescending(v=>v.ContactName);
            if (queryObj.SortBy == "id")
               query=(queryObj.IsSortAscending) ? query.OrderBy(v=>v.Id) : query.OrderByDescending(v=>v.Id);
             */

            // sorting on server -- Version 2 --- 

            // Refactoring using Dictionary
            if (queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            if (queryObj.ModelId.HasValue)
                query = query.Where(v => v.ModelId == queryObj.ModelId.Value);
            // c# 6 - Object Initialisation Syntax
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
            };

            query = query.ApplyOrdering(queryObj, columnsMap);
      
            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result; 
        }
    }
}