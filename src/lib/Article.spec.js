import React from 'react';
import Article from './Article';


describe('The Article Instance', () => {

    describe('when initialised', () => {

        it('should correctly assign the title property', () => {
            const article = new Article("title", "body");
            expect(article.title).toEqual("title")
        });

        it('should correctly assign the body property', () => {
            const article = new Article("title", "body");
            expect(article.body).toEqual("body")
        });

        it('should correctly set the rank property', () => {
            const article = new Article("title", "body");
            expect(article.rank).toEqual(0)
        });


    });


    describe('getTitle()', () => {

        it('should return the title property when called', () => {
            const article = new Article("title", "body");
            expect(article.getTitle()).toEqual("title")
        });

    });

    describe('setTitle(title)', () => {

        it('should assign the title property to the value of the first parameter when called', () => {
            const article = new Article("title", "body");
            article.setTitle("New Title")
            expect(article.title).toEqual("New Title")
        });

    });

    describe('getBody()', () => {

        it('should return the body property when called', () => {
            const article = new Article("title", "body");
            expect(article.getBody()).toEqual("body")
        });

    });


});
