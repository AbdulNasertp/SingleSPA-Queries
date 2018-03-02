import * as singleSpa from 'single-spa';
import { componentFactoryName } from '@angular/compiler';

  singleSpa.registerApplication('app-1', () =>
  import ('../app1/app1.js'), () => AppTOLoad("1"));

  singleSpa.registerApplication('app-2', () =>
  import ('../app2/app2.js'), () => AppTOLoad("2"));

  singleSpa.registerApplication('app-1-copy', () =>
  import ('../app1/app1.js'), () => AppTOLoad("3"));

  singleSpa.registerApplication('app-2-copy', () =>
  import ('../app2/app2.js'), () => AppTOLoad("4")); 
 
 function RegisterApp(metaData)
 {
    console.log('looping');
    $.each(metaData,function(i,v){
      console.log( v);
      console.log('../app1/app1.js' === v.AppUrl);
      console.log(v.AppUrl);
      console.log(typeof('../app1/app1.js'));
      console.log(typeof(v.AppUrl));
      singleSpa.registerApplication(v.AppName, () =>
      import (v.AppUrl), () => AppTOLoad(v.AppId));
      
      // singleSpa.registerApplication(v.AppName, () =>
      // import ('../app1/app1.js'), () => AppTOLoad(v.AppId));
    });
    //console.log(singleSpa);
    //singleSpa.start();
 }

singleSpa.start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  }
}

var currentApp = 0;
var ismMetaData = {
  "tenantId": 1234,
  "metaData": [
    {
      "AppId": 1,
      "AppName": "App1",
      "Message": "This is app 1",
      "AppUrl" : '../app1/app1.js'
    }, 
    {
      "AppId": 2,
      "AppName": "App2",
      "Message": "This is app 2",
      "AppUrl" : '../app2/app2.js'
    }, 
    {
      "AppId": 3,
      "AppName": "App3",
      "Message": "This is app 3",
      "AppUrl" : '../app1/app1.js'
    }
  ]
}

$(document).ready(
  function(){
    $('a[data-toggle=tab]').click(function(){
      console.log(this.href);
      //alert(this.id);      
      //console.log("currentApp on tab click:" + currentApp);
      currentApp = this.id;
      singleSpaNavigate('/'+ currentApp);
    });

	//on load register micro apps
    var apps = ismMetaData.metaData;
    RegisterApp(apps);
  }
);

function AppTOLoad(appId)
{
	//tab change get the current app id and compare the app to load
  console.log("appId: " + appId + " TabId: " + currentApp);
  //console.log(currentApp == appId ? true : false);
  return currentApp == appId ? true : false;
}

