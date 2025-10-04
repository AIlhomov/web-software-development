<script>
  let { children } = $props();
</script>

<header>
  <h2>My application</h2>
</header>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<div>
  {@render children()}
</div>

<footer>
  <p>My application is cool.</p>
</footer>
