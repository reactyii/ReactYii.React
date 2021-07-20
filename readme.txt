Создание нового дизайна (на примере https://github.com/tabler/tabler)
1. создаем новый реакт проект https://ru.reactjs.org/docs/create-a-new-react-app.html
	я буду создавать в той же папке где расположен проект ReactYii.Yii (для удобства указания путей на шаблон)

	yarn create react-app reactyii.tabler --template typescript
	rename reactyii.tabler ReactYii.Tabler

	yarn add @tabler/core

	добавляем в
	"dependencies":{
		"reactyii.react": "git+https://github.com/reactyii/ReactYii.React",
		"react-snap": "^1.23.0"
	},
	"scripts": {
		"postbuild": "react-snap"
	},
	"reactSnap": {
		"removeStyleTags": true,
		"destination": "ssr"
	}

