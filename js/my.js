var child_process = require('child_process');
var fs =            require('fs');
var package =       require('./package.json');
var bUpdate =       false;
var dataFile =      undefined;
var bootPath =      undefined;
var bootDevice =    undefined;
var microSDDevice = undefined;

function saveBootPath() {
  var command = undefined;
  switch (process.platform) {
    case 'darwin':
      command = "mount|grep /Volumes/boot|awk '{print $3;}'";
      break;
    case 'linux':
      command = "mount|grep boot|grep media|awk '{print $1 \" \" $3;}'";
      break;
    case 'win32':
      command = "mount|grep boot|grep media|awk '{print $3;}'";
      break;
    default:
      command = "mount|grep boot|grep media|awk '{print $3;}'";
      break;
  }
  child_process.exec(command, function(err, stdout, stderr) {
    if (err) {console.log(err); callback('There was a problem finding the microSD card.'); return;}

    if (process.platform == 'linux') {
      bootPath =      stdout.replace('\n', '').match(/\s([a-z0-9\/]+)/i)[1];
      bootDevice =    stdout.replace('\n', '').match(/^([a-z0-9\/]+)/i)[1];
      microSDDevice = stdout.replace('\n', '').match(/^([a-z\/]+)/i)[1];
      console.log('bootPath: ' + bootPath + ' bootDevice: ' + bootDevice + ' microSDDevice: ' + microSDDevice);
    } else {
      bootPath = stdout.replace('\n', '');
    }
    bootPath = stdout.replace('\n', '');
  });
} // function saveBootPath()

function version() {
  return '<font style="font-size: 20pt">v' + package.version + '</font>';
} // function version()

function handleSaveClick() {
  var strSSID =      document.getElementById('wifiSSID').value;
  var strPassword =  document.getElementById('wifiPassword').value;
  var objSelect =    document.getElementById('countryCode');
  var strCountry =   objSelect.options[objSelect.selectedIndex].value;
  var bHidden =      document.getElementById('wifiHidden').checked == 1;  
  var strContent =   '\n\nnetwork={\n\tssid="' +
                     strSSID +      '"\n\tpsk="' +
                     strPassword +  '"\n' +
                     (bHidden ? '\tscan_ssid=1\n' : '') +'}\n';
  var lines =        dataFile.split('\n');
  dataFile =         '';
  var line =         undefined;
  var reCountry =    /^country=([.]*){2}/;                   // ^country=GB # United Kingdom$
  var reSSID =       /^[ \t]+ssid[ \t]?=[ \t]?"([^"]*)"/;    // ^  ssid="ZoneName"$
  var rePassword =   /^[ \t]+psk[ \t]?=[ \t]?"([^"]*)"/;     // ^  psk="ZonePassword"$
  var reHidden =     /^[ \t]+scan_ssid[ \t]?=[ \t]?([01])$/; // ^  scan_ssid=1$
  for (var i=0; i<lines.length; i++) {
    line = lines[i];
    if (bUpdate) {
      if (line.match(reHidden))   { line = '\tscan_ssid=' + bHidden; }
      if (line.match(reSSID))     { line = '\tssid="' +     strSSID     + '"'; }
      if (line.match(rePassword)) { line = '\tpsk="' +      strPassword + '"'; }
    }
    if (line.match(reCountry))      { line = 'country=' +     strCountry; }
    dataFile += line + '\n';
  }
  if (bUpdate) {
    fs.writeFile(bootPath + '/octopi-wpa-supplicant.txt', dataFile, (err) => {
      if(err){alert("An error ocurred updating the file " + err.message);}
    });
  } else {
    dataFile += strContent;
    fs.writeFile(bootPath + '/octopi-wpa-supplicant.txt', dataFile, (err) => {
      if(err){alert("An error ocurred updating the file " + err.message);}
    });    
  }
  document.getElementById('idSupplicant').classList.remove('red');
  document.getElementById('idSupplicantFilename').classList.remove('red');
  document.getElementById('idSupplicantCheckbox').classList.add('fa-check-square');
  document.getElementById('idSupplicantCheckbox').classList.remove('fa-square');
  document.getElementById('save-button').disabled = true;
  setTimeout(function(){alert('Update saved. Please press the Eject button to safely remove the microSD card.')},500);
} // function handleSaveClick()

function handleReadClick() {
  fs.readFile(bootPath + '/octopi-wpa-supplicant.txt', 'utf-8', (err, data) => {
    if (err) {
      alert("It appears that the microSD is not mounted.\n\nHere is the error: " + err.message);
      return;
    } else {
      // Save the data globally for later re-use if updating
      dataFile = data;
      var lines = data.split('\n');

      // This will auto-select the country code that was found in the file
      var country = lines.find(function(item) {return item.substr(0, 8)=='country='}).substr(8,2);
      if (country.length == 2) document.getElementById('countryCode').value = country;

      // This will auto-populate the SSID and password if seen in the file
      var network = lines.find(function(item) {return item.substr(0, 8)=='network='});
      if (network != undefined) {
      var bUpdate =     true;
      var reSSID =      /^[ \t]+ssid[ \t]?=[ \t]?"([^"]*)"/;    // ^  ssid="ZoneName"$
      var rePassword =  /^[ \t]+psk[ \t]?=[ \t]?"([^"]*)"/;     // ^  psk="ZonePassword"$
      var reHidden =    /^[ \t]+scan_ssid[ \t]?=[ \t]?([01])$/; // ^  scan_ssid=1$
      var line =        '';
      var strSSID =     '';
      var strPassword = '';
      var bHidden =     0;
      for (var i=0; i<lines.length; i++) {
        line = lines[i];
        if (line.match(reSSID)) {
          strSSID = line.match(reSSID)[1];
          document.getElementById('wifiSSID').value = strSSID;
        }
        if (line.match(rePassword)) {
          strPassword = line.match(rePassword)[1];
          document.getElementById('wifiPassword').value = strPassword;
        }
        if (line.match(reHidden)) {
          bHidden = line.match(reHidden)[1];
          document.getElementById('wifiHidden').checked = (bHidden == 1);
        }
      } // for (var i=0...)
    } else {
      document.getElementById('wifiSSID').value = '?';
      document.getElementById('wifiPassword').value = '?';
      } // if (network != undefined)
      document.getElementById('sectionReadButton').classList.add('hidden');
      document.getElementById('sectionFiles').classList.remove('hidden');
      document.getElementById('sectionEditWPA').classList.remove('hidden');
    }   // if (err)
  });   // fs.readFile()
}       // function handleReadClick()

// Bind the click events after the page has had a chance to load
setTimeout(function() {
  document.getElementById('save-button').addEventListener('click', handleSaveClick);
  document.getElementById('read-button').addEventListener('click', handleReadClick);
}, 1000);

function eject(callback) {
  //  diskutil eject $(mount|grep boot|grep media|awk '{print $1;}')
  var command = undefined;
  switch (process.platform) {
    case 'darwin':
      command = "/usr/sbin/diskutil eject $(mount|grep /Volumes/boot|awk '{print $1;}')";
      break;
    case 'linux':
      command = "/bin/umount $(mount|grep boot|grep media|awk '{print $1;}')";
      break;
    case 'win32':
      command = "/usr/sbin/diskutil eject $(mount|grep boot|grep media|awk '{print $1;}')";
      break;
    default:
      command = "/usr/sbin/diskutil eject $(mount|grep boot|grep media|awk '{print $1;}')";
      break;
  }
  child_process.exec(command, function(err, stdout, stderr) {
    if (err) {console.log(err); callback('There was a problem ejecting the microSD card.'); return;}

    console.log('The boot partition was unmounted.');
    if (process.platform == 'linux') {
      callback("The boot partition was unmounted. Please use File Manager to eject the rootfs partition then physically remove the microSD card.");
    } else {
      callback("The microSD was safely ejected. Please remove it now.");
    }         // if (process.platform ...
  });         // /bin/umount ...
  setTimeout(function(){
    document.getElementById('sectionReadButton').classList.add('hidden');
    document.getElementById('sectionFiles').classList.add('hidden');
    document.getElementById('sectionEditWPA').classList.add('hidden');
    document.getElementById('ejectLink').href = 'javascript:alert("The microSD has already been ejected.");';
  },1000);
} // function eject(callback)

// Populate the wi-fi country select
var countries = [
  'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ',
  'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ',
  'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ',
  'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ',
  'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET',
  'FI', 'FJ', 'FK', 'FM', 'FO', 'FR',
  'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY',
  'HK', 'HM', 'HN', 'HR', 'HT', 'HU',
  'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT',
  'JE', 'JM', 'JO', 'JP',
  'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ',
  'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY',
  'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ',
  'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ',
  'OM',
  'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY',
  'QA',
  'RE', 'RO', 'RS', 'RU', 'RW',
  'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ',
  'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ',
  'UA', 'UG', 'UM', 'US', 'UY', 'UZ',
  'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU',
  'WF', 'WS',
  'YE', 'YT',
  'ZA', 'ZM', 'ZW'
];

// Populate the country code pulldown after the page has had a chance to load
setTimeout(function() {
  countries.forEach(function(item) {
    var option = document.createElement('option');
    option.text = option.value = item;
    document.getElementById('countryCode').appendChild(option);
  });

  saveBootPath();
}, 1000);
