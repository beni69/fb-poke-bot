function poke() {
    elt_links = document.getElementsByTagName("span");
    for (var i = 0; i != elt_links.length; i++) {
        elt_link = elt_links[i];
        if (elt_link.innerHTML.contains("Poke Back")) elt_link.click();
    }
    setTimeout(poke, 1000);
}
poke();
