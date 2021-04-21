using MySql.Data.MySqlClient;
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace Source
{
    class Program
    {

        public static string command { get; set; }
        static void Main(string[] args)
        {
            
            try
            {
                do
                {
                    Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                    socket.Bind(new IPEndPoint(IPAddress.Parse("127.0.0.1"), 3000));
                    socket.Listen(0);
                    var client = socket.Accept();
                    var buffer = Encoding.UTF8.GetBytes("-> CONECTADO");
                    client.Send(buffer, 0, buffer.Length, 0);
                    buffer = new byte[255];
                    int rec = client.Receive(buffer, 0, buffer.Length, 0);
                    Array.Resize(ref buffer, rec);
                    string datos = Encoding.UTF8.GetString(buffer);
                    string[] LISTA = datos.Split(',');


                    Console.WriteLine(LISTA[0] + LISTA[1] + LISTA[2] + LISTA[3]);
                    Console.WriteLine(datos);

                    switch (LISTA[3])
                    {
                        case "add":

                            string register = RegisterUser(LISTA[0], LISTA[1], LISTA[2]);
                            Console.WriteLine("SE USO EL ADD - " + register);
                            buffer = Encoding.UTF8.GetBytes(register);
                            client.Send(buffer, 0, buffer.Length, 0);
                            break;
                        case "check":
                            string login = UserLogin(LISTA[0], LISTA[1]);
                            Console.WriteLine("SE USO EL CHECK - " + login);
                            buffer = Encoding.UTF8.GetBytes(login);
                            client.Send(buffer, 0, buffer.Length, 0);
                            break;
                    }
                    

                    

                    client.Close();
                    socket.Close();
                } while (true);      
            }
            catch (Exception x)
            {

                Console.WriteLine("Failure On The Server: " + x);
            }



        }


        public static string RegisterUser(string username, string password, string date)
        {
            string answer = string.Empty;
            try
            {
                if (username.Contains(" ") || username.Contains(",")){

                    answer = "ERROR-USER-CONTAIN-SPACES"; // EL USUARIO COLOCADO TIENE ESPACIOS o COMAS
                    return answer;
                }

                if(username.Length <= 6)
                {
                    answer = "ERROR-USER-LENGTH"; // EL USUARIO COLOCADO NO SUPERA LOS 6 CARACTERES
                    return answer;
                }

                if(password.Length > 12)
                {
                    answer = "ERROR-PASSWORD-LENGTH"; // EL USUARIO COLOCADO NO SUPERA LOS 6 CARACTERES
                    return answer;
                }

                try
                {
                    MySqlConnection connection = createConnection();
                    MySqlCommand cmd = connection.CreateCommand();
                    cmd.CommandText = "select * from Users where User = @User";
                    connection.Open();
                    cmd.Parameters.AddWithValue("@User", username);
                    MySqlDataReader checkuser = cmd.ExecuteReader();

                    if (checkuser.Read())
                    {
                        answer = "USER-ALREADY-EXIST";
                        connection.Close();
                        return answer;
                    }
                }
                catch (Exception)
                {

                    answer = "ERROR-404"; // NO SE PUDO CONECTAR A LA BASE DE DATOS
                    return answer;
                }


                try
                {
                    MySqlConnection connection = createConnection();
                    MySqlCommand cmd = connection.CreateCommand();
                    cmd.CommandText = "insert into Users(User, Password, Date) values('"+username+"', '"+password+ "', '"+date+"')";
                    connection.Open();
                    cmd.ExecuteNonQuery();

                    answer = "USER-SUCCEFULLY-REGISTED"; // CUANDO EL USUARIO SE REGISTRA CORRECTAMENTE, OBTIENE ESTE MENSAJE
                    connection.Close();
                    return answer;
                }
                catch (Exception)
                {

                    answer = "USER-FAIL"; // SI FALLA ALGUN DATO, MANDA UN USER FAIL
                    
                    return answer;

                }


            }
            catch (Exception)
            {

                answer = "ERROR-404"; // NO SE PUDO CONECTAR A LA BASE DE DATOS
                return answer;
            }

            
        }

        public static string UserLogin(string username, string password)
        {
            string answer = string.Empty;
            try
            {
                
                MySqlConnection connection = createConnection();
                MySqlCommand cmd = connection.CreateCommand();
                cmd.CommandText = "select * from Users where User = @User";
                connection.Open();
                cmd.Parameters.AddWithValue("@User", username);
                MySqlDataReader checkuser = cmd.ExecuteReader();
                if (checkuser.Read())
                {
                    if (password == checkuser["Password"].ToString())
                    {   
                        answer = "USER-CHECK-SUCCESS"; // EL USUARIO SE REGISTRO CORRECTAMENTE CON SU NOMBRE Y CONTRASEÑA
                        return answer;
                    }
                    else
                    {
                        answer = "USER-CHECK-FAIL-PASSWORD"; // EL USUARIO COLOCO BIEN EL USUARIO, PERO NO LA CONTRASEÑA.
                        return answer;
                    }
                }
                else
                {
                    answer = "USER-CHECK-NOEXIST"; // EL USUARIO NO EXISTE EN LA BASE DE DATOS.
                    return answer;
                }
            }
            catch (Exception)
            {
                answer = "ERROR-404"; // NO SE PUDO CONECTAR A LA BASE DE DATOS
                return answer;
            }
        }


        public static MySqlConnection createConnection()
        {
            MySqlConnection connection = null;
            try
            {
                connection = new MySqlConnection("SERVER=sql10.freesqldatabase.com; DATABASE=sql10406830; UID=sql10406830; USERNAME=sql10406830; PASSWORD=abas1AWQYH;PORT=3306;");
            }
            catch (Exception)
            {
                Console.WriteLine("Could not connect to the database");
            }
            return connection;
        }


    }
}
