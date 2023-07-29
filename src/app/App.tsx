import { useEffect, useRef, useState } from "react";
import "./App.css";
import { CharTest, CharTestResult } from "comp/testType/CharTest";
import { WordTest, WordTestResult } from "comp/testType/WordTest";
import { CharTestCont } from "comp/testMode/CharTestCont";
import { WordTestCont } from "comp/testMode/WordTestCont";

export default function App() {
    const chars = "the quick brown fox jumps over the lazy dog".split('');
    // const chars = "thequickbrownfoxjumpsoverthelazydog".split('');

    return (
        <>
            <WordTestCont
                genText={() => chars}
            />
        </>
    );
}