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
        startDate: "Sep-2015",
        endDate: "Sep-2019",
        childrens:
            [
                "M.Ing"
            ],
        skills: [

        ]
    },
    {
        id: 'M.Ing',
        type: 'study',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Zaragoza, Spain",
        thesis: "",
        startDate: "Sep-2019",
        endDate: "Jun-2021",
        childrens:
            [
                "M.Rob",
                "SDU.job",
                "ITA"
            ],
        skills: [

        ]
    },
    {
        id: 'M.Rob',
        type: 'study',
        title: "Master's Degree in Robotics - Advanced Robotics Technologies",
        institution: "University of Zaragoza",
        location: "Odense, Denmark",
        thesis: "",
        startDate: "Sep-2021",
        endDate: "Oct-2023",
        childrens:
            [
                "M.Rob.Munich"
            ],
        skills: [

        ]
    },
    {
        id: 'SDU.job',
        type: 'work',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Odense, Denmark",
        startDate: "Nov-2021",
        endDate: "Sep-2022",
        childrens:
            [
                "MAGAZINO"
            ],
        skills: [

        ]
    },
    {
        id: 'ITA',
        type: 'work',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Remote",
        startDate: "Sep-2021",
        endDate: "Jun-2022",
        childrens:
            [
                "MAGAZINO"
            ],
        skills: [

        ]
    },
    {
        id: 'M.Rob.Munich',
        type: 'work',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Munich, Germany",
        startDate: "Sep-2022",
        endDate: "Oct-2023",
        childrens:
            [
                "ARRK"
            ],
        skills: [

        ]
    },
    {
        id: 'MAGAZINO',
        type: 'study',
        title: "Master's Degree in Industrial Engineering",
        institution: "University of Zaragoza",
        location: "Munich, Germany",
        startDate: "Aug-2022",
        endDate: "May-2023",
        childrens:
            [
                "ARRK"
            ],
        skills: [

        ]
    },
    {
        id: 'ARRK',
        type: 'work',
        title: "Software Developer in ADAS and Autonomous Driving",
        institution: "ARRK Engineering GmbH",
        location: "Munich, Germany",
        startDate: "Jun-2023",
        endDate: "Current",
        childrens:
            [
            ],
        skills: [

        ]
    },
]


const main = (() => {

    var nodes = new Map();
        var levels = new Map();
        var links = []

        // Initialize
        for (let node of cv) {
            nodes.set(node.id, { "location": { x: 0, y: 0 }, "level": -1, "parents": [] })
        }

        // Create all the parent relations
        for (let node of cv) {
            for (let children of node.childrens) {
                nodes.get(children).parents.push(node.id)
                links.push([node.id, children])
            }
        }

        // 
        for (let node of cv) {
            if (nodes.get(node.id).parents.length == 0) {
                nodes.get(node.id).level = 0
                levels.set(0, [node.id])
            }
            else {
                var maxLevel = -1
                for (let pId of nodes.get(node.id).parents) {
                    if (nodes.get(pId).level > maxLevel) {
                        maxLevel = nodes.get(pId).level;
                    }
                }
                nodes.get(node.id).level = maxLevel + 1;
                if (!levels.has(maxLevel + 1)) {
                    levels.set(maxLevel + 1, [node.id]);
                }
                else {
                    if (node.type == "work") {
                        // Push them to the right
                        levels.get(maxLevel + 1).push(node.id);
                    }
                    else {
                        // Push them to the left
                        levels.get(maxLevel + 1).unshift(node.id);
                    }
                }
            }
        }
        for (var i = 1; i < levels.size; i++) {
            let currentHeight = HEIGHT_INCREMENT * i;
            let semiWidth = WIDTH_INCREMENT * (levels.get(i).length - 1) / 2;
            for (var j = 0; j < levels.get(i).length; j++) {
                nodes.get(levels.get(i)[j]).location.x = semiWidth - WIDTH_INCREMENT * j ;
                nodes.get(levels.get(i)[j]).location.y = currentHeight;
            }
        }

        console.log(nodes);
    });
main()