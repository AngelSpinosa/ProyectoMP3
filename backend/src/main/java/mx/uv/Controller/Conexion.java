package mx.uv.Controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Conexion {
    private static String url = "jdbc:mysql://localhost:3306/MP3";
    private static String driverName = "com.mysql.cj.jdbc.Driver"; 
    private static String username = "root";
    private static String password = "1157";
    private static Connection connection = null;

    public static Connection getConnection() {
        try {
            Class.forName(driverName);
            connection = DriverManager.getConnection(url, username, password);
        } catch (SQLException e) {
            System.out.println(" SQL:" + e);
        } catch (ClassNotFoundException e) {
            System.out.println("Driver:" + e);
        }
        return connection;
    }

    public static void close(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar la conexión: " + e);
            }
        }
    }

    public static void close(Statement stm) {
        if (stm != null) {
            try {
                stm.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar el Statement: " + e);
            }
        }
    }

    public static void close(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                System.out.println("Error al cerrar el ResultSet: " + e);
            }
        }
    }
}
