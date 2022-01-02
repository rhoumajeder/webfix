from time import sleep
import requests
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


import threading
import webbrowser

from time import sleep
#link_chrome_exe = "C:\Users\bouma\.wdm\drivers\chromedriver\win32\96.0.4664.45\chromedriver.exe"
# browser = webdriver.Chrome(ChromeDriverManager().install())   to installl exe chrome 

def printit():
    #threading.Timer(60 * 4, printit).start()
    url_home = "http://127.0.0.1:8000/home"
    url_search_all_records = "http://127.0.0.1:8000/api/search-all-records/"
    url_get_all_records = "http://127.0.0.1:8000/api/get-all-records/"

    # response = requests.get(url_get_all_records)
    # #webbrowser.open(url1)
    # print(response)
    # sleep(2)

    # browser = webdriver.Chrome("C:/Users/michael/Downloads/chromedriver_win32/chromedriver.exe")
    browser = webdriver.Chrome("C:/Users/bouma/.wdm/drivers/chromedriver/win32/96.0.4664.45/chromedriver.exe")
   
    browser.get(url_home)
    sleep(15)
    button_element = browser.find_element_by_id("search_id")
    button_element.click()
    sleep(15)
    browser.close()


while True : 

    printit()
    sleep(60*4)