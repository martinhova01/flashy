module db {

    requires transitive java.sql;
    requires core;

    opens db to java.sql, core;

    exports db;

}
