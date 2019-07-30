using EFDPA.Abstract;
using EFDPA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebUI.Controllers.api
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        protected IRepository<Users> ef_us;

        public UsersController(IRepository<Users> us)
        {
            this.ef_us = us;
        }

        // GET: api/users/all
        [Route("all")]
        [ResponseType(typeof(Users))]
        public IHttpActionResult GetUsers()
        {
            try
            {
                List<Users> list = this.ef_us.Get().ToList()
                    .Select(u => new Users
                    {
                        id = u.id,
                        user_name = u.user_name,
                        description  = u.description ,
                        email  = u.email ,
                        surname  = u.surname ,
                        name  = u.name ,
                        patronymic  = u.patronymic ,
                        id_structural_subdivisions = u.id_structural_subdivisions,
                        StructuralSubdivisions = new StructuralSubdivisions
                        {
                            id = u.StructuralSubdivisions.id,
                            position = u.StructuralSubdivisions.position,
                            name_subdivisions_ru = u.StructuralSubdivisions.name_subdivisions_ru,
                            name_subdivisions_en = u.StructuralSubdivisions.name_subdivisions_en,
                            name_subdivisions_full_ru = u.StructuralSubdivisions.name_subdivisions_full_ru,
                            name_subdivisions_full_en = u.StructuralSubdivisions.name_subdivisions_full_en,
                            type = u.StructuralSubdivisions.type,
                            code = u.StructuralSubdivisions.code,
                            parent_id = u.StructuralSubdivisions.parent_id,
                        }
                    }).ToList();
                if (list == null || list.Count() == 0)
                {
                    return NotFound();
                }
                return Ok(list);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET: api/users/user_name/ealevchenko
        [Route("user_name/{user_name}")]
        [ResponseType(typeof(Users))]
        public IHttpActionResult GetUsersOfName(string user_name)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(user_name)) return NotFound();
                
                
                Users user = this.ef_us.Get()
                    .Where(u => u.user_name == @"EUROPE\"+ user_name)
                    .ToList()
                    .Select(u => new Users
                    {
                        id = u.id,
                        user_name = u.user_name,
                        description = u.description,
                        email = u.email,
                        surname = u.surname,
                        name = u.name,
                        patronymic = u.patronymic,
                        id_structural_subdivisions = u.id_structural_subdivisions,
                        StructuralSubdivisions = new StructuralSubdivisions
                        {
                            id = u.StructuralSubdivisions.id,
                            position = u.StructuralSubdivisions.position,
                            name_subdivisions_ru = u.StructuralSubdivisions.name_subdivisions_ru,
                            name_subdivisions_en = u.StructuralSubdivisions.name_subdivisions_en,
                            name_subdivisions_full_ru = u.StructuralSubdivisions.name_subdivisions_full_ru,
                            name_subdivisions_full_en = u.StructuralSubdivisions.name_subdivisions_full_en,
                            type = u.StructuralSubdivisions.type,
                            code = u.StructuralSubdivisions.code,
                            parent_id = u.StructuralSubdivisions.parent_id,
                        }
                    }).FirstOrDefault();
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }


    }
}
