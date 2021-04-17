using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Usuarios;

namespace src
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string Login(Usuario data)
        {
            string respuesta = "";
            Usuario user = data;
            respuesta = user != null ? "Bien" : "Mal";
            return respuesta;
        }
    }
}