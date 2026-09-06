package com.EnRenta_Back.POM;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AdminSaveCarTest {

    private final WebDriver driver;
    private final WebDriverWait wait;

    private By brandInput = By.name("carName");
    private By descriptionInput = By.name("carDescription");
    private By imgUrlInput = By.name("image-0");
    private By submitButtonInput = By.xpath("//button[contains(text(),'Agregar producto')]");

    public AdminSaveCarTest(WebDriver driver, WebDriverWait wait) {
        this.driver = driver;
        this.wait = wait;
    }

    //metodo completar form
    public void fillCarForm(String brand, String description, String imgUrl) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(brandInput)).sendKeys(brand);
        driver.findElement(descriptionInput).sendKeys(description);
        driver.findElement(imgUrlInput).sendKeys(imgUrl);
    }

    //metodo seleccionar boton
    public void submitForm() {
        wait.until(ExpectedConditions.visibilityOfElementLocated(submitButtonInput)).click();
    }

    //varificamos si se envio correctamente
    public boolean isSuccessMessageDisplayed() {
        wait.until(ExpectedConditions.alertIsPresent());

        Alert alert = driver.switchTo().alert();

        String alertText = alert.getText();

        if (alertText.equals("Auto agregado con éxito")) {
            return true;
        }
        return false;
    }
}
