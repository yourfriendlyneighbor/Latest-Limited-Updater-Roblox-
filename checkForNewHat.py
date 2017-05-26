import urllib.request
import json
import threading
import os


URL = 'http://search.roblox.com/catalog/json?CatalogContext=1&Subcategory=2&SortType=3&SortAggregation=5&LegendExpanded=true&Category=2&PageNumber=1'

def doStuff():

    f = open('newhat.txt', 'r')
    oldcontent = f.read()
    f.close()

    threading.Timer(3.0, doStuff).start()
    res = urllib.request.urlopen(URL)
    content = res.read()

    data = json.loads(content.decode('utf-8'))
    writeData = data[0]['Name'] + '\n' + data[0]['Price'] + '\n' + data[0]['AbsoluteUrl']# + '\n' + data[0]['Remaining']
    if oldcontent != writeData:
        oldcontent = writeData

        print('New Data')
        f = open('newhat.txt', 'w', encoding='utf-8')
        f.write(writeData)
        f.close()
    else:
        print('Old Data')

doStuff()

os.system('node server.js')
