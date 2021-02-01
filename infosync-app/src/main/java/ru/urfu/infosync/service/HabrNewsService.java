package ru.urfu.infosync.service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import ru.urfu.infosync.model.HabrPost;

import java.io.IOException;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class HabrNewsService {

    public List<HabrPost> getNews() {
        var posts = new Elements();
        try {
            Document doc = Jsoup.connect("https://habr.com/ru/").get();
            posts = doc.select("article.post_preview");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return posts.stream().map(element -> {
            element.select("a.post__habracut-btn").remove();
            return new HabrPost(
                    element.select("a.post__title_link").get(0).text(),
                    element.select("a.post__title_link").get(0).attr("href"),
                    element.select("div.post__body_crop").get(0).toString()
            );
        }).collect(toList());
    }

    public String getNews(String url) {

        var posts = new Elements();
        try {
            Document doc = Jsoup.connect(url).get();
            posts = doc.select("div.post__body_full");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return posts.select("div.post__body_full").get(0).toString();
    }
}