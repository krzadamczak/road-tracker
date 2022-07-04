# Opis aplikacji

Aplikacja została stworzona przy pomocy React. Dodatkowe narzędzia to Firebase, który zapewnia backend oraz nanoid, który zapewnia generowanie unikalnych id. Aplikacja składa się z 4 podstron, są to:

-   Aktualna pogoda
-   Nowe zgłoszenie
-   Wszystkie znane dotychczas zgłoszenia
-   Profil
    Aplikacja zawiera funkcjonalność tworzenia kont/logowania się.

Podstrona _Aktualna pogoda_ została zintegrowana z API udostępnianym przez https://openweathermap.org/. Możliwe jest samodzielne wybranie miejscowości dla której ma być wyświetlana aktualna pogoda lub skorzystanie z modułu GPS.

Podstrona _Nowe zgłoszenie_ pozwala na dodanie nowej szkody lub zdarzenia na drodze.

Podstrona _Wszystkie znane dotychczas zgłoszenia_ wyświetla zgłoszenia zapisane dla aktualnie zalogowanego użytkownika. Widoczny jest również status zgłoszenia, który może zostać nadany przez administratora w konsoli Firebase.

Podstrona _Profil_ zawiera podstawowe informacje o użytkowniku takie jak ilość stworzonych przez niego zgłoszeń, ilość zgłoszeń wszystkich kierowców. Pozwala również na zmianę imienia oraz nazwiska.

Do prawidłowego działania aplikacji wymagany jest dostęp do Firebase oraz OpenWeather. API Key dla Firebase jest generowany podczas tworzenia aplikacji na stronie https://firebase.google.com/. Konfiguracja Firebase jest zawarta w pliku firebase.js, dane potrzebne do połączenia aplikacji z Firebase są przechowywane w pliku .env. Zmienne zawarte w pliku .env muszą być poprzedzone przedrostkiem REACT*APP*, w przeciwnym wypadku zostaną zignorowane. API Key dla OpenWeather jest nadawany podczas zakładania konta na stronie https://openweathermap.org/. Musi być zawarty w adresie URL w celu otrzymania prawidłowej odpowiedzi z serwera.

# Instalacja

W celu zainstalowania pakietów niezbędnych do działania aplikacji należy skorzystać z polecenia **npm install**. Polecenie **npm start** uruchomi aplikację w trybie developerskim. Z kolei komenda **npm run build** przygotuje program w trybie produkcji (folder build).
