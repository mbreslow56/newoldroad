var express = require('express');
const app = express()
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const hogan = require('hogan-express')
const http_module = require('http')
const async = require('async')
const http = http_module.Server(app)
//mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/emunah');
app.engine('html', hogan)
const Cosmic = require('cosmicjs')
const helpers = require('./helpers')
const bucket_slug = process.env.COSMIC_BUCKET || 'new-old-road-blog'
const read_key = process.env.COSMIC_READ_KEY
const config = {
  bucket: {
    slug: bucket_slug,
    read_key: read_key
  }
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const partials = {
  header: 'partials/header',
  footer: 'partials/footer'
}
app.use('/blog', (req, res, next) => {
  res.locals.year = new Date().getFullYear()
  next()
});
app.use(express.static('public'));
app.use(express.static('node_modules'));
//blog
app.get('/blog', (req, res) => {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, (err, response) => {
    const cosmic = response
    if (cosmic.objects.type.posts) {
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at))
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date
      })
    } else {
      cosmic.no_posts = true
    }
    res.locals.cosmic = cosmic
    res.render('blog.html', { partials })
  })
});
//single post
app.get('/:slug', (req, res) => {
  async.series([
    callback => {
      Cosmic.getObject(config, { slug: req.params.slug, status: 'all' }, (err, response) => {
        res.locals.cosmic = response
        return callback()
      })
    },
    callback => {
      Cosmic.getObject(config, { slug: req.params.slug, status: 'all' }, (err, response) => {
        res.locals.current_post = response.object
        // const friendly_date = helpers.friendlyDate(new Date(response.object.created))
        // res.locals.current_post.friendly_date = friendly_date.month + ' ' + friendly_date.date
        if (!res.locals.current_post)
          res.status(404)
        res.render('post.html', { partials })
      })
    }
  ])
})
//author posts
app.get('/author/:slug', (req, res) => {
  Cosmic.getObjects(config, (err, response) => {
    const cosmic = response
    if (cosmic.objects.type.posts) {
      let author_posts = []
      cosmic.objects.type.posts.forEach(post => {
        const friendly_date = helpers.friendlyDate(new Date(post.created_at))
        post.friendly_date = friendly_date.month + ' ' + friendly_date.date
        if (post.metadata.author.slug === req.params.slug) {
          res.locals.author = post.metadata.author
          author_posts.push(post)
        }
      })
      cosmic.objects.type.posts = author_posts
    } else {
      cosmic.no_posts = true
    }
    res.locals.author
    res.locals.cosmic = cosmic
    res.render('author.html', { partials })
  })
});
app.get('/home', (req, res) => {
  
    res.render('home.html', { partials })
});
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || '8000', function(){
  console.log("8000. New Old Road!!")
});
