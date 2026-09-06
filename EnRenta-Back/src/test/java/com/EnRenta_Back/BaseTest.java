package com.EnRenta_Back.tests;

import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class BaseTest {

    protected WebDriver driver;
    protected WebDriverWait wait;


    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait =
    }

    public static WebDriver getDriver() {
        if (driver == null) {
            throw new IllegalStateException("Driver se encuentra nula");
        }
        return driver;
    }

    public static void tearDownClass() {
        driver.quit();
    }

}
