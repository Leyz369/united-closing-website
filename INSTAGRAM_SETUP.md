# Instagram Feed Setup

Das Instagram-Widget zeigt automatisch eure echten Posts von @united_closing an.

## Aktuelle Status

Das Widget ist vollständig implementiert und funktioniert mit Fallback-Bildern. Um echte Instagram-Posts anzuzeigen, müsst ihr einen Instagram Access Token konfigurieren.

## Instagram Access Token einrichten

### Schritt 1: Facebook Developer Account erstellen

1. Geht zu [Facebook Developers](https://developers.facebook.com/)
2. Meldet euch mit eurem Facebook-Account an
3. Klickt auf "My Apps" → "Create App"
4. Wählt "Consumer" als App-Typ
5. Gebt einen App-Namen ein (z.B. "United Closing Website")

### Schritt 2: Instagram Basic Display API einrichten

1. In eurer Facebook App, geht zu "Products" → "Add Product"
2. Wählt "Instagram Basic Display"
3. Klickt auf "Create New App" im Instagram Basic Display Dashboard
4. Füllt die erforderlichen Felder aus:
   - **Valid OAuth Redirect URIs**: `https://socialsizze.com/`
   - **Deauthorize Callback URL**: `https://socialsizze.com/`
   - **Data Deletion Request URL**: `https://socialsizze.com/`

### Schritt 3: Instagram Tester Account hinzufügen

1. Geht zu "Roles" → "Instagram Testers"
2. Klickt auf "Add Instagram Testers"
3. Gebt euren Instagram-Username ein (@united_closing)
4. Auf Instagram: Geht zu Einstellungen → Apps und Websites → Tester-Einladungen
5. Akzeptiert die Einladung

### Schritt 4: Access Token generieren

1. Kopiert eure **Instagram App ID** und **Instagram App Secret**
2. Öffnet diese URL in eurem Browser (ersetzt die Platzhalter):

```
https://api.instagram.com/oauth/authorize?client_id={APP_ID}&redirect_uri=https://socialsizze.com/&scope=user_profile,user_media&response_type=code
```

3. Autorisiert die App
4. Ihr werdet zu einer URL weitergeleitet mit einem Code-Parameter: `https://socialsizze.com/?code=XXXXXX`
5. Kopiert diesen Code

### Schritt 5: Short-Lived Token erhalten

Führt diesen curl-Befehl aus (ersetzt die Platzhalter):

```bash
curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id={APP_ID} \
  -F client_secret={APP_SECRET} \
  -F grant_type=authorization_code \
  -F redirect_uri=https://socialsizze.com/ \
  -F code={CODE}
```

### Schritt 6: Long-Lived Token erhalten

Nehmt den Token aus Schritt 5 und führt aus:

```bash
curl -X GET \
  "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={APP_SECRET}&access_token={SHORT_LIVED_TOKEN}"
```

Dies gibt euch einen Token, der 60 Tage gültig ist.

### Schritt 7: Token als Supabase Secret speichern

1. Geht zur [Supabase Dashboard](https://supabase.com/dashboard)
2. Wählt euer Projekt
3. Geht zu "Edge Functions" → "Secrets"
4. Fügt ein neues Secret hinzu:
   - **Name**: `INSTAGRAM_ACCESS_TOKEN`
   - **Value**: Euer Long-Lived Access Token

### Schritt 8: Token automatisch erneuern

Long-Lived Tokens sind 60 Tage gültig. Um sie zu erneuern, führt diesen Befehl vor Ablauf aus:

```bash
curl -X GET \
  "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={CURRENT_TOKEN}"
```

## Wie es funktioniert

1. **Edge Function**: `/supabase/functions/fetch-instagram-posts/index.ts`
   - Ruft Posts von der Instagram API ab
   - Speichert sie in der Supabase-Datenbank
   - Cache für 1 Stunde (3600 Sekunden)

2. **Datenbank**: `instagram_posts` Tabelle
   - Speichert alle Posts mit Bildern, Captions und Links
   - Wird automatisch aktualisiert

3. **Frontend**: `/src/components/InstagramFeed.tsx`
   - Lädt Posts von der Edge Function
   - Zeigt Fallback-Bilder an, wenn keine API-Token vorhanden ist
   - Automatische Updates beim Laden der Seite

## Troubleshooting

### "Instagram access token not configured"

Das Widget verwendet die Fallback-Bilder. Folgt den Schritten oben, um einen Access Token zu konfigurieren.

### Posts werden nicht aktualisiert

1. Überprüft, ob der Access Token noch gültig ist (60 Tage)
2. Testet die Edge Function direkt in der Supabase Dashboard
3. Überprüft die Browser-Konsole auf Fehler

### "Invalid access token"

Der Token ist abgelaufen. Generiert einen neuen Long-Lived Token (siehe Schritt 6-7).

## Cache verwalten

Der Cache wird automatisch nach 1 Stunde aktualisiert. Um manuell zu aktualisieren:

1. Geht zur Supabase Dashboard
2. SQL Editor
3. Führt aus: `DELETE FROM instagram_posts;`
4. Die Posts werden beim nächsten Seitenaufruf neu geladen

## Hinweis

Die Instagram Basic Display API erlaubt nur das Abrufen von Posts. Likes, Comments und Stories sind nicht verfügbar.
