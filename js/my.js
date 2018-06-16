var fs = require('fs');

function handleSaveClick() {
    document.getElementById('idSupplicant').classList.remove('red');
    document.getElementById('idSupplicantFilename').classList.remove('red');
    document.getElementById('idSupplicantCheckbox').classList.add('fa-check-square')
    document.getElementById('idSupplicantCheckbox').classList.remove('fa-square') ;
}

function handleReadClick() {
    fs.readFile('/Volumes/boot/octopi-wpa-supplicant.txt', 'utf-8', (err, data) => {
        if (err) { alert("An error ocurred reading the file :" + err.message); return; }

        var lines = data.split('\n');
        // alert('Read ' + lines.length + ' lines from octopi-wpa-supplicant.txt');
        // console.log("The file content is : " + data);

        // This will auto-select the country code that was found in the file
        var country = lines.find(function(item) {return item.substr(0, 8)=='country='}).substr(8,2);
        if (country.length == 2) document.getElementById('countryCode').value = country;

        // This will auto-populate the SSID and password if seen in the file
        var network = lines.find(function(item) {return item.substr(0, 8)=='network='});
        if (network != undefined) {
            // console.log('Network is active');
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
                    // console.log('Found matching line: ' + line);
                    strSSID = line.match(reSSID)[1];
                    // console.log('The SSID was: [' + strSSID + ']');
                    document.getElementById('wifiSSID').value = strSSID;
                }
                if (line.match(rePassword)) {
                    // console.log('Found matching line: ' + line);
                    strPassword = line.match(rePassword)[1];
                    // console.log('The Password was: [' + strPassword + ']');
                    document.getElementById('wifiPassword').value = strPassword;
                }
                if (line.match(reHidden)) {
                    // console.log('Found matching line: ' + line);
                    bHidden = line.match(reHidden)[1];
                    // console.log('Hidden was: [' + bHidden + ']');
                    document.getElementById('wifiHidden').checked = (bHidden == 1);
                }
            }
        } else {
            document.getElementById('wifiSSID').value = '?';
            document.getElementById('wifiPassword').value = '?';
        }
    });
    document.getElementById('sectionReadButton').classList.add('hidden');
    document.getElementById('sectionFiles').classList.remove('hidden');
    document.getElementById('sectionEditWPA').classList.remove('hidden');
}

document.getElementById('save-button').addEventListener('click', handleSaveClick);
document.getElementById('read-button').addEventListener('click', handleReadClick);

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

countries.forEach(function(item) {
    var option = document.createElement('option');
    option.text = option.value = item;
    document.getElementById('countryCode').appendChild(option);
});