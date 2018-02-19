const getElement = (parent, tagName) =>
  parent.getElementsByTagName(tagName)[0].textContent;

const getElements = (parent, tagName) => parent.getElementsByTagName(tagName);

const fetchPodcastFeed = feedUrl => {
  return fetch(
    new Request(`https://cors-anywhere.herokuapp.com/${feedUrl}?format=xml`),
    {
      headers: { "Content-Type": "application/rss+xml" }
    }
  )
    .then(results => results.text())
    .then(str => {
      const data = {
        title: "",
        lastUpdated: "",
        link: "",
        summary: "",
        coverImage: "",
        episodes: []
      };
      const responseDoc = new DOMParser().parseFromString(
        str,
        "application/xml"
      );

      data.title = getElement(responseDoc, "title");
      data.lastUpdated = getElement(responseDoc, "pubDate");
      data.link = getElement(responseDoc, "link");
      data.summary = getElement(responseDoc, "itunes:summary");
      data.coverImage = responseDoc
        .getElementsByTagName("itunes:image")[0]
        .getAttribute("href");

      Array.from(getElements(responseDoc, "item")).forEach(item => {
        data.episodes.push({
          title: getElement(item, "title"),
          pubDate: getElement(item, "pubDate"),
          description: getElement(item, "description"),
          duration: item.getElementsByTagName("itunes:duration")[0]
            ? item.getElementsByTagName("itunes:duration")[0].textContent
            : false,
          audio: item.getElementsByTagName("enclosure")[0].getAttribute("url"),
          coverImage:
            item.getElementsByTagName("itunes:image")[0].getAttribute("href") ||
            data.coverImage
        });
      });

      return data;
    });
};

export default fetchPodcastFeed;
