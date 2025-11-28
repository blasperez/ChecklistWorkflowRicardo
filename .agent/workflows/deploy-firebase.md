---
description: Deploy manual a Firebase Hosting
---

# Deploy a Firebase Hosting

Este workflow te permite hacer deployment manual de tu checklist a Firebase.

## Pasos

// turbo
1. **Copiar el checklist al directorio de deployment**
```bash
Copy-Item "plan_digital_html.html" -Destination "dist\index.html" -Force
```

2. **Hacer deploy a Firebase**
```bash
firebase deploy --only hosting
```

## Verificación

Después del deployment, Firebase te dará una URL. Visita esa URL para verificar que el checklist está funcionando correctamente.

**URL del proyecto:** https://spotifylyricstranslator.web.app

## Notas

- El progreso del checklist se guarda automáticamente en el navegador usando `localStorage`
- Cada usuario tendrá su propio progreso guardado localmente
- Si necesitas compartir el progreso entre usuarios, considera usar el archivo TSX con Firestore
