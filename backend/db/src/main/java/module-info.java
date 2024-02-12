module db {

    requires transitive java.sql;
    requires transitive core;

    opens db to java.sql, core;

    exports db;

}
