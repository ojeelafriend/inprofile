using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Users
{
    public class Users
    {
        [DllExport]
        public static string AddUser(string username, string password, string account)
        {
            string response = username + password + account;
                return response;
        }
    }
}
