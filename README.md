# **Sicherheitsaufgaben**

## **1. Authentifizierung und Zugriffskontrolle**

- [x] **(0-1 Punkt)** Es wird anhand eines JWT-Tokens die Identität des Benutzers sichergestellt.
- [x] **(0-1 Punkt)** Endpunkte, welche den Datenzugriff erlauben, sind gegen den Zugriff von nicht identifizierten Benutzern geschützt.
- [x] **(0-1 Punkt)** Es können nur Posts im Namen der eigenen Identität erstellt werden.

---

## **2. Datensicherheit**

- [x] **(0-1 Punkt)** Passwörter werden nicht im Klartext, sondern als Hash in der Datenbank gespeichert.
- [x] **(0-1 Punkt)** Posts werden in der Datenbank verschlüsselt gespeichert.
- [x] **(0-1 Punkt)** Posts werden bei der Abfrage entschlüsselt und unverschlüsselt an den Client übertragen, sodass dieser die Posts in Klartext einsehen kann.

---

## **3. Validierung und Sanitierung**

- [x] **(0-1 Punkt)** Die Eingaben der Benutzer werden «Escaped», sodass kein unerlaubtes HTML oder auch JS an andere Benutzer ausgeliefert wird.

---

## **4. Sicherheit von Abfragen und Backend**

- [x] **(0-1 Punkt)** Die Abfragelogik und die Queries, welche auf der Datenbank ausgeführt werden, werden auf der Serverseite und nicht vom Client ausgeführt.
- [x] **(0-1 Punkt)** Der Server gibt in seinen Antworten nicht mehr preis, welches Framework im Backend eingesetzt wird.

---

## **5. Schutz vor Angriffen**

- [x] **(0-1 Punkt)** Der Server wird durch Rate Limiting vor Brute-Force-Angriffen geschützt.

---

## **6. Protokollierung und Überwachung**

- [ ] **(0-1 Punkt)** Auf dem Server wird ein Log geführt, welcher Benutzer wann welchen Request auf dem Server ausgeführt hat. Dies gilt auch für Anmeldeversuche.

---

## **7. Fehlerbehandlung**

- [ ] **(0-1 Punkt)** Der Server hat allgemein ein besseres Error-Handling, sodass es bei unerwarteten Fehlern nicht zu einem Komplettabsturz der Applikation kommt.

---

## **8. Entwicklungsbest Practices**

- [ ] **(0-1 Punkt)** Jede einzelne Behebung eines Sicherheitsproblems wird in einem separaten Commit behandelt, und dieser ist in der Historie erkennbar, indem z. B. die jeweilige OWASP-Einteilung als Kommentar verwendet wird.
- [ ] **(0-1 Punkt)** Der Code ist sauber strukturiert, folgt den gängigen JavaScript-Code-Richtlinien und hat eine konsistente Formatierung.
