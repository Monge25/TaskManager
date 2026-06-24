# 📋 TaskManager

## Descripción

**TaskManager** es una aplicación web desarrollada por **SoftDev Solutions** cuyo objetivo es facilitar la administración de tareas y actividades de un equipo de trabajo.

La plataforma permite organizar, asignar y dar seguimiento a las tareas de los integrantes del equipo, mejorando la colaboración y el control del progreso de los proyectos.

---

## Objetivos

* Administrar tareas de manera eficiente.
* Asignar actividades a los miembros del equipo.
* Dar seguimiento al estado de cada tarea.
* Facilitar la colaboración entre desarrolladores.
* Implementar un flujo de trabajo basado en Git y GitHub para mantener la calidad del código.

---

## Tecnologías

* HTML5
* CSS3
* JavaScript
* Git
* GitHub

*(Estas tecnologías pueden actualizarse conforme avance el desarrollo del proyecto.)*

---

## Estructura de ramas

El proyecto utiliza un flujo de trabajo basado en ramas para permitir el desarrollo simultáneo de varios programadores.

### Rama principal

* **main**

  * Contiene la versión estable y lista para producción.

### Rama de desarrollo

* **develop**

  * Integra todas las funcionalidades antes de pasar a producción.

### Ramas de funcionalidades

Cada nueva característica se desarrolla en una rama independiente con el siguiente formato:

```
feature/nombre-de-la-persona
```

Ejemplos:

```
feature/Alberto
feature/Juan
feature/Maria
```

---

## Flujo de trabajo

1. Clonar el repositorio.

```
git clone <url-del-repositorio>
```

2. Cambiar a la rama de desarrollo.

```
git checkout develop
```

3. Actualizar la rama.

```
git pull origin develop
```

4. Crear una nueva rama para la funcionalidad.

```
git checkout -b feature/nueva-funcionalidad
```

5. Realizar los cambios necesarios.

6. Guardar los cambios.

```
git add .
git commit -m "Descripción de los cambios"
```

7. Enviar la rama al repositorio remoto.

```
git push origin feature/nueva-funcionalidad
```

8. Crear un Pull Request hacia la rama **develop** para revisión y aprobación.

---

## Convención de commits

Se recomienda utilizar mensajes claros y descriptivos.

Ejemplos:

```
feat: agregar módulo de inicio de sesión
fix: corregir validación del formulario
docs: actualizar README
style: mejorar diseño de la interfaz
refactor: reorganizar componentes
```

---

## Colaboración

Todos los integrantes del equipo deberán:

* Trabajar en una rama independiente.
* Mantener su rama actualizada con **develop**.
* Resolver conflictos antes de crear un Pull Request.
* Esperar la revisión del código antes de realizar el merge.

---

## Estructura del proyecto

```
TaskManager/
│
├── docs/
├── src/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── components/
│
├── index.html
├── README.md
└── .gitignore
```

---

## Equipo de desarrollo

**SoftDev Solutions**

* Emiliano Monge Osuna
* Alexa Marian Gastélum Díaz
* Nicol Amairani Gastélum Díaz

---

## Licencia

Este proyecto fue desarrollado con fines académicos para demostrar la implementación de un flujo de trabajo colaborativo utilizando **Git** y **GitHub**.
