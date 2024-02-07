module db {

    requires java.sql;
    requires core;

    opens db to java.sql, core;

    exports db;

}
