# Serverless-kehitys Amazon Web Services -pilvipalvelualustalla

Tiivis esittely Serverless-kehityksestä hyödyntäen AWS:n palveluja ja Serverless Framework -kirjastoa

## Serverless-arkkitehtuuri

Serverless-arkkitehtuurissa sovelluslogiikka suoritetaan ympäristössä ilman kehittäjälle näkyviä prosesseja, käyttöjärjestelmiä tai virtuaalikoneita, kaikki se on palveluntarjoajan huolehdittavana. Sovelluskehittäjä keskittyy vain koodin kirjoittamiseen.

Serverless-arkkitehtuuri eroaa Platform as a Service -mallista siinä, että se skaalautuu automaattisesti kysynnän mukaan, eikä kuluta resursseja kun palveluun ei tule kutsuja, ja se myös abstraktoi pois käyttöjärjestelmä-tason kehittäjän näkökulmasta.

Esimerkki AWS serverless-arkkitehtuurista:\
![Esimerkki AWS serverless-arkkitehtuurista](/images/example-aws-serverless-architecture.png "Esimerkki AWS serverless-arkkitehtuurista")

Serverless-arkkitehtuuri rakentuu yleensä seuraavien kahden palvelumallin päälle:

- Backend as a Service (BaaS) –  koko palvelinpuolen sovellus on rakennettu valmiista, palveluntarjoajien palikoista, joita kutsutaan asiakasohjelmasta, esim. tietovarasto, autentikaatio, loki- ja analyysityökalut.

- Function as a Service (FaaS) - palvelinpuolen logiikka toteutetaan tilattomilla funktioilla, joiden suoritus laukeaa tapahtumista. Palveluntarjoaja huolehtii kaikesta funktioiden instansointiin, pyyntöihin vastaamiseen, monitorointiin, autentikaatioon ja lokien pitämiseen liittyen.

### Serverless-arkkitehtuurin hyötyjä ja haittapuolia

Hyödyt:

- Ei kulu resursseja infran pystyttämiseen ja ylläpitämiseen.
- Skaalautuu automaattisesti, ja näin palvelun laatu säilyy kysyntäpiikeissä ja säästyy kapasiteetin manuaalisen säätämisen työltä.
- Laskutus vain aktiivisen käytön mukaan johtaa kustannussäästöihin useimmissa tapauksissa.
- Sovelluksen toiminta ei riipu siitä, onko yksittäinen palvelin pystyssä vai ei.
- Mahdollistaa nopeamman kokeilu- ja kehityssyklin uusille sovelluksille, koska jää enemmän aikaa keskittyä itse sovelluksen kehittämiseen.

Haittapuolet:

- Riippuvuus palveluntarjoajan API:sta, palvelun saatavuudesta, riskejä palvelun hinnoittelun muutoksista ja palvelun tietoturva-aukoista. Palveluntarjoajan vaihtaminen voi johtaa laajoihin muutostarpeisiin sovelluksessa.
- Pitkään yhtäjaksoisesti resursseja käyttävät sovellukset eivät välttämättä ole kustannustehokkaita.
- Ei hallintaa suoritusympäristöön.
- Viive "kylmän" funktion suorituksessa.
- Testauksen toteuttaminen FaaS-alustan päällä toimivalle sovellukselle voi olla haastavampaa.

[Wikipedia: Serverless computing](https://en.wikipedia.org/wiki/Serverless_computing)\
[Wikipedia: FaaS](https://en.wikipedia.org/wiki/Function_as_a_service)\
[Dzone: The Pros and Cons of AWS Lambda](https://dzone.com/articles/the-pros-and-cons-of-aws-lambda)\
[Quora: What is the advantages and disadvantages of using AWS Lambda with and without Serverless?](https://www.quora.com/What-is-the-advantages-and-disadvantages-of-using-AWS-Lambda-with-and-without-Serverless)\
[DevOps.com: Should You Go ‘Serverless’? The Pros and Cons](https://devops.com/go-serverless-pros-cons/)

## AWS Lambda

AWS:n Lambda on Function as a service (FaaS) -alusta, jonka toiminta on alkanut marraskuussa 2014. Sen avulla voi luoda erilaisista tapahtumista aktivoituvia, tilattomia funktioita. Suoraan tuettuja ohjelmointikieliä ovat tällä hetkellä: Node.js (JavaScript), Python, Java (Java 8), C# (.NET Core), sekä Go. 

Myös muilla pilvipalveluiden tarjoajilla on omia FaaS-alustoja. Esimerkkejä kilpailevista alustoista:  Google Cloud Functions, Microsoft Azure Functions, IBM Cloud Functions, Oracle Cloud Fn.

Lambda-funktioita voi hyödyntää monenlaisiin tarkoituksiin, esimerkkejä käyttötapauksista ovat mm.: kuva- tai videolatauksien prosessointi Amazon S3 Bucketiin, muutokset DynamoDB:n tauluihin, vastaaminen webbisivulla tapahtuviin klikkauksiin tai IOT laitteiden sensorien lukemiin reagoiminen. Lambdojen avulla voi myös rakentaa HTTP-pyyntöihin vastaavan palvelinohjelman,  ja toteuttaa esim. REST-rajapinnan. Tällöin palvelu kuluttaa resursseja vain kun pyyntöjä saapuu.

### Lambda-funktion toimintaperiaate

Jokainen Lambda-funktion instanssi pyörii omassa eristetyssä ympäristössään ja funktioon liitetty tapahtuma aktivoi funktion suorituksen. Palveluntarjoaja vastaa instanssien käynnistymisestä ja sammuttamisesta. Jos instanssia ei ole käynnissä, tapahtuu ns. "cold start" eli instanssi pyörähtää käyntiin, mistä aiheutuu millisekunneissa laskettava viive. Jos kutsuja tulee paljon, uusia instansseja luodaan dynaamisesti vastauksena kysyntään. Kun kutsuja ei tule, niin tietyn ajan kuluttua instanssi poistuu valmiudesta kuluttamasta resursseja. Palvelun käytön laskutus perustuu funktioiden suorituspyyntöjen määrään (requests) ja suoritusaikaan suhteessa muistin käyttöön (duration in GB-seconds).

Lämpimän ja kylmän funktio-kontin invokaatio:\
![Lämpimän ja kylmän funktio-kontin invokaatio](/images/aws-lambda-invocations.png "Lämpimän ja kylmän funktio-kontin invokaatio")

### Lambda-funktion luominen

Lambda-funktioita voi kehittää AWS Lambda konsolissa tai koodin ja sen tarvitsemat kirjastot voi pakata zip-tiedostoon ja lähettää sen Lambda konsoliin AWS CLI-sovellusta käyttäen. Lambda-funktion koodi on tilatonta, mutta se voi käsitellä tilallista tietoa, joka on tallennettuna muuhun web-palveluun. Lambda-funktio voi kutsua kirjastoja ja se voi luoda säikeitä ja prosesseja. Funktiolle voi asettaa yhden tai useamman tapahtumalähteen, joka aktivoi sen suorituksen. Funktiolle pitää asettaa aikakatkaisun 1 sekunnin and 15 minuutin väliltä ja sille voi asettaa muistikapasiteetin 128 MB – 3 GB väliltä, mikä määrittää myös suhteessa sille allokoitavan prosessoritehon.

Node.js Lambda-käsittelijäfunktion malli:

```javascript
exports.handler = function(event, context, callback) {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('value1 =', event.key1);
    console.log('value2 =', event.key2);
    console.log('value3 =', event.key3);
    console.log('remaining time =', context.getRemainingTimeInMillis());
    console.log('functionName =', context.functionName);
    console.log('AWSrequestID =', context.awsRequestId);
    console.log('logGroupName =', context.log_group_name);
    console.log('logStreamName =', context.log_stream_name);
    console.log('clientContext =', context.clientContext);
    if (typeof context.identity !== 'undefined') {
        console.log('Cognito
        identity ID =', context.identity.cognitoIdentityId);
    }    
    callback(null, event.key1); // Echo back the first key value
    // or
    // callback("some error type"); 
};
```

[AWS: Lambda](https://aws.amazon.com/lambda/)\
[Wikipedia: AWS Lambda](https://en.wikipedia.org/wiki/AWS_Lambda)\
[AWS: Lambda Function Handler in Node.js](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html)\
[AWS: Serverless Architectures
with AWS Lambda](https://d1.awsstatic.com/whitepapers/serverless-architectures-with-aws-lambda.pdf)

## Serverless Framework

Serverless Framework on avoimen lähdekoodin serverless-kehitykseen ja julkaisuun tarkoitettu komentorivityökalu. Se julkistettiin alun perin vuonna 2015 eri nimellä ja tuki ainoastaan AWS:a, mutta nykyään sillä kehitettyjä sovelluksia voi julkaista myös muihin FaaS-palveluihin kuten Googlen, Microsoftin ja IBM:n.

Serverless Frameworkin yhteydessä keskeinen käsite on "Infrastructure as Code" (IaC) eli käytännössä sen avulla voi määrittää koko sovelluksen vaatiman infrastruktuurin YAML-muotoisena konfiguraatiotiedostona. Tämä mahdollistaa julkaisun pitkälle viedyn automaation, mikä nopeuttaa julkaisemisprosessia, vähentää kustannuksia ja pienentää virheiden ja tietoturvariskien mahdollistuutta. AWS:n tapauksessa Serverless Framework muodostaa konfiguraation pohjalta AWS CloudFormation-templaatin, joka kuvaa sovelluksen vaatimat AWS-resurssit.

Serverless Frameworkin muita hyötyjä on, että se ainakin periaatteessa vähentää riippuvuutta yhdestä palveluntarjoajasta, koska todennäköisesti isompi osa lähdekoodia on uudelleenkäytettävää ja samaa työkalua voi käyttää myös muiden palveluntarjoajien kanssa. Serverless Framework tukee plugineja, joiden avulla voi käyttää valmiita komponentteja sovelluksen kehityksessä ratkaisemaan yleisiä kehityksessä vastaan tulevia tarpeita.

Esimerkki yksinkertaisesta konfiguraatiotiedostosta:

```yaml
service: serverless-simple-http-endpoint

frameworkVersion: ">=1.1.0 <2.0.0"

provider:
  name: aws
  runtime: nodejs4.3

functions:
  currentTime:
    handler: handler.endpoint
    events:
      - http:
          path: ping
          method: get
```

[Serverless Framework](https://serverless.com/framework/)\
[Wikipedia: Serverless Framework](https://en.wikipedia.org/wiki/Serverless_Framework)\
[Wikipedia: Infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code)

## Tehtävät

1. Tee ensin tämä tutoriaali tutustuaksesi Serverless-kehitykseen AWS-alustalla:\
[AWS: Build a Serverless Web Application](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)\
Ota kuvakaappaus lopputuloksesta, kun testaat sovellusta.

2. Seuraavaksi toteuta Serverless Frameworkilla tutoriaalin mukainen REST-API:\
[Serverless Express REST-API tutorial](https://serverless.com/blog/serverless-express-rest-api/)\
Ota kuvakaappaus testatusta GET-reitistä, kun olet ensin luonut POST-reitillä käyttäjän.

3. Lopuksi toteuta demo-sovellukseen TODO-listan merkinnän päivittäminen tehdyksi ja sen poistaminen.