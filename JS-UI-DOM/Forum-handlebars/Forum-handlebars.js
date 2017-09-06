function solve() {
	return function() {
		var template = ['<h1>{{title}}</h1>' + 
'<ul>' + 
'{{#posts}}' + 
'<li>' + 
'{{#if author}}' + 
'<div class="post">' + 
'<p class="author">' + 
'<a class="user" href="/user/{{author}}">{{author}}</a>' + 
'</p>' + 
'<pre class="content">{{{text}}}</pre>' + 
'</div>' + 
'{{else}}' + 
'<div class="post">' + 
'<p class="author">' + 
'<a class="anonymous">Anonymous</a>' + 
'</p>' + 
'<pre class="content">{{{text}}}</pre>' + 
'</div>' + 
'{{/if}}{{#if comments}}' + 
'<ul>' + 
'{{#comments}}{{#unless deleted}}{{#if author}}' + 
'<li>' + 
'<div class="comment">' + 
'<p class="author">' + 
'<a class="user" href="/user/{{author}}">{{author}}</a>' + 
'</p>' + 
'<pre class="content">{{{text}}}</pre>' + 
'</div>' + 
'</li>{{else}}' + 
'<li>' + 
'<div class="comment">' + 
'<p class="author">' + 
'<a class="anonymous">Anonymous</a>' + 
'</p>' + 
'<pre class="content">{{{text}}}</pre>' + 
'</div>' + 
'</li>' + 
'{{/if}} {{/unless}} {{/comments}}' + 
'</ul> {{/if}} {{/posts}}' + 
'</ul>' ].join('\n');

		return template;
	}
}
