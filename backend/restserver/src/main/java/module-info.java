module springboot {
    requires com.google.gson;

    requires spring.web;
    requires spring.beans;
    requires spring.boot;
    requires spring.context;
    requires spring.boot.autoconfigure;

    requires core;
    requires db;

    opens restserver to spring.beans, spring.context, spring.web, core, db;
}
