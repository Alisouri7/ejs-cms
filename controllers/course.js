const courseModel = require('./../models/course');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


exports.create = async (req, res) => {

    try {
        const { title } = req.body;

        if (!title) {
            const courses = await courseModel.find({}).lean();

            return res.render('index', {
                courses,
                title: 'Courses page',
                error: { message: 'نام دوره را وارد کنید' },
                visibleClass: true
            })
        }

        const course = await courseModel.findOne({ title });

        if (course) {
            if (course.title == title) {
                const courses = await courseModel.find({}).lean();

                return res.render('index', {
                    courses,
                    title: 'Courses page',
                    error: { message: 'نام دوره تکراری است' },
                    visibleClass: true
                })

            }
        }

        await courseModel.create({ title });
        return res.redirect('/courses/')

    } catch (err) {
        return res.status(500).json({ error: err })
    }

};

exports.getAll = async (req, res) => {

    const courses = await courseModel.find({}).lean();

    res.render('index', {
        courses,
        title: 'Courses Page'
    })

    return
};

exports.remove = async (req, res) => {

    try {
        const { id } = req.params;

        const isIDValid = mongoose.Types.ObjectId.isValid(id);

        if (!isIDValid) {
            const courses = await courseModel.find({}).lean();

            return res.render('index', {
                courses,
                title: 'Courses page',
                error: { message: 'آبجکت آیدی برای حذف دوره معتبر نیست' },
                visibleClass: true
            })

        }
        await courseModel.findOneAndDelete({ _id: id })

        return res.redirect('/courses/')
    } catch (err) {
        return res.status(500).json({ mesage: err })
    }
};


exports.edit = async (req, res) => {

    const { id } = req.params;

    const { title } = req.body;

    const isIDValid = mongoose.Types.ObjectId.isValid(id);

    if (!isIDValid) {
        const courses = await courseModel.find({}).lean();

        return res.render('index', {
            courses,
            title: 'Courses page',
            error: { message: 'آبجکت آیدی برای تغییر نام دوره معتبر نیست' },
            visibleClass: true
        })

    };

    if (!title) {
        const courses = await courseModel.find({}).lean();

        return res.render('index', {
            courses,
            title: 'Courses page',
            error: { message: 'نام دوره را برای تغییر نام وارد کنید' },
            visibleClass: true
        })
    };


    const course = await courseModel.findOneAndUpdate({ _id: id }, {
        title
    });
    
    const courseWithNewTitle = await courseModel.findOne({_id: id}).lean();

    const coursesDir = path.join('C:', 'Users', 'Ali Souri', 'Desktop', 'css', 'NodeJS Course', 'Template Engines', 'practice-ejs-cms', 'public', 'images', 'courses');

    fs.renameSync(`${coursesDir}/${course.title}.webp`, `${coursesDir}/${courseWithNewTitle.title}.webp`, (err) => {
        if (err) throw err
    });

    return res.redirect('/courses/')

};

exports.search = async (req, res) => {
    const { search } = req.body;

    let separated = search.split(' ');
    let separatedSearch = [];

    separated.forEach(word => {
        word.toLowerCase()
        separatedSearch.push(word)
    });

    console.log(separatedSearch);
    res.end()
    // let results = new Set();

    // separatedSearch.forEach((word) => {

    // })
}