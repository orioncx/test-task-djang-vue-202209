# test-task-djang-vue-202209

## Front setup
```
cd frontend
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Runs unit tests
```
npm run test:unit
```
## Backend setup
```
cd backend
pip install -i requirements.txt 
python manage.py migrate
```
### Start dev server
```
python manage.py runserver 7000
```
If you prefer using another port - change id in 
[frontend/vue.config.js](frontend/vue.config.js)

### Runs unit tests
```
python manage.py test
```
