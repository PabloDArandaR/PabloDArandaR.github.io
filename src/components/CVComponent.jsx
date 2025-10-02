
import React, { useState, useEffect } from 'react';
import '../index.css';

const HEIGHT_INCREMENT = 100;
const WIDTH_INCREMENT = 50;
const cv_first = 'B.Ing'
const cv = [
    {
        id: 'B.Ing',
        type: 'study',
        title: "Bachelor's Degree in Industrial Engineering Technologies",
        institution: "University of Zaragoza",
        location: "Zaragoza, Spain",
        thesis: "",
        startDate: "2015-09-01",
        endDate: "2019-09-01",
        childs:
            [
                "M.Ing"
            ],
        skills: [

        ],
	description:"Description",
    },
    {
        id: 'M.Ing',
        type: 'study',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Zaragoza, Spain",
        thesis: "",
        startDate: "2019-06-01",
        endDate: "2021-06-01",
        childs:
            [
                "M.Rob",
                "SDU.Job",
                "ITA"
            ],
        skills: [

        ],
	description:"",
    },
    {
        id: 'M.Rob',
        type: 'study',
        title: "Master's Degree in Robotics - Advanced Robotics Technologies",
        institution: "Syddansk Universitet",
        location: "Odense, Denmark",
        thesis: "",
        startDate: "2021-09-01",
        endDate: "2023-10-01",
        childs:
            [
                "M.Rob.Munich"
            ],
        skills: [

        ],
	description:"",
    },
    {
        id: 'SDU.job',
        type: 'work',
        title: "Working student Robot Programmer",
        institution: "University of Zaragoza",
        location: "Odense, Denmark",
        startDate: "2021-11-01",
        endDate: "2022-09-01",
        childs:
            [
                "MAGAZINO"
            ],
        skills: [

        ],
	description:"",
    },
    {
        id: 'ITA',
        type: 'work',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Remote",
        startDate: "2021-09-01",
        endDate: "2022-06-01",
        childs:
            [
                "MAGAZINO"
            ],
        skills: [

        ],
	description:"",
    },
    {
        id: 'M.Rob.Munich',
        type: 'work',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Munich, Germany",
        startDate: "2022-09-01",
        endDate: "2023-10-01",
        childs:
            [
                "ARRK"
            ],
        skills: [

        ],
	description:"",
    },
    {
        id: 'MAGAZINO',
        type: 'work',
        title: "Working Student Mechanical Engineer",
        institution: "Magazino GmbH",
        location: "Munich, Germany",
        startDate: "2022-08-17",
        endDate: "2023-06-01",
        chilcs:
            [
                "ARRK"
            ],
        skills: [

        ],
	description:"",
    },
    {
        id: 'ARRK',
        type: 'work',
        title: "Software Developer in ADAS and Autonomous Driving",
        institution: "ARRK Engineering GmbH",
        location: "Munich, Germany",
        startDate: "2023-06-15",
        endDate: "1900-01-01",
        childs:
            [
            ],
        skills: [
        ],
	description:"",
    },
]

const NodePrint = (node) => {
	return <p>
			<b>{node.title}</b> <br />
			{node.institution}: {node.startDate} - {node.endDate} 
		</p>
}

const CVComponent = () => {
	let work = cv.filter((node) => node.type == 'work')
	let study = cv.filter((node) => node.type == 'study')
    	return (
		<div>
			<h1> Work </h1>
			{work.map((node, index) => (
				NodePrint(node)	
			))}
			<h1> Study </h1>
			{study.map((node, index) => (
				NodePrint(node)
			))}
		</div>
	);
};

const styles = {
    nodeStyle: 'border border-solid border-white',
    text: 'text-4xl color-yellow-600 font-bold underline text-slate-900',
	h1: 'text-6xl',
	
};

export default CVComponent;
