package com.EnRenta_Back.testdata;

public class CarTestData {
    public static final String BASE_URL = "http://localhost:5173/";
    public static final String HOME_URL = BASE_URL + "Home";
    //Path variable
    public static String getDetailCarUrl(String id){
        return BASE_URL + "cars/" + id;
    };


}
