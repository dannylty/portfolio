---
layout: post_project
title:  "holoscrape"
description: YouTube Livestream Chat Scraper and Visualiser
---

# holoscrape

<style>
.hs-dia { width: 100%; min-width: 600px; height: auto; display: block; margin: 15px auto; }
.hs-wrap { overflow-x: auto; contain: inline-size; margin-bottom: 5px; }
.hs-dia text { font-family: inherit; fill: var(--text-color); font-size: 13px; text-anchor: middle; }
.hs-dia .b { font-weight: bold; font-size: 14px; }
.hs-dia .s { font-size: 11.5px; }
.hs-dia .l { text-anchor: start; }
.hs-dia .r { text-anchor: end; }
.hs-dia .box { fill: var(--background-color); stroke: var(--text-color); stroke-width: 1.2; }
.hs-dia .c1 { fill: var(--highlight-color-1); fill-opacity: 0.45; }
.theme-light .hs-dia .c1 { fill-opacity: 0.25; }
.theme-light .hs-dia .c2 { fill-opacity: 0.4; }
.hs-dia .c2 { fill: var(--highlight-color-2); fill-opacity: 0.55; }
.hs-dia .ln { stroke: var(--text-color); stroke-width: 1.2; fill: none; }
.hs-dia .ah { fill: var(--text-color); }
.hs-cap { font-size: 0.9em; text-align: center; margin-bottom: 20px; }
</style>

holoscrape watches YouTube for live streams from VTuber agencies (Hololive and Nijisanji EN by default) and records every chat message from every stream while it is live. I started it in April 2022 to give my Raspberry Pis something real to do, and gave it a full overhaul in 2026. The code is on [GitHub](https://github.com/dannylty/holoscrape).

The core idea is small: a supervisor asks [Holodex](https://holodex.net) what is live, and hands every live stream to its own scraper process. Most of the design is about letting that run unattended for weeks: streams start and end at any hour, chat connections drop, machines restart, and several scrapers write to the same database at once.

<div style="text-align: center;">
  <a href="/assets/images/holoscrape-tmux.jpg" target="_blank">
    <img src="/assets/images/holoscrape-tmux.jpg" alt="tmux window with twenty tiled panes, each streaming one live chat" style="border: 1px solid black;"/>
  <div style="font-size: 0.9em; margin-bottom: 20px;">The "visualiser": one tmux pane per live stream, tiled. This one was running on a Raspberry Pi in November 2022. Click to expand.</div>
  </a>
</div>

<br>
<details open>
<summary style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px; cursor: pointer;">Architecture</summary>
<div class="content">

<div class="hs-wrap">
<svg class="hs-dia" viewBox="0 0 720 380" role="img" aria-label="holoscrape architecture: main.py polls Holodex and spawns one scrape.py per live stream; scrapers read YouTube chat via pytchat; both write to MySQL, local files and logs">
<defs><marker id="hs-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<rect class="box" x="10" y="40" width="150" height="56" rx="4"/>
<text class="b" x="85" y="64">Holodex API</text>
<text class="s" x="85" y="83">live streams by org</text>
<rect class="box" x="10" y="262" width="150" height="56" rx="4"/>
<text class="b" x="85" y="286">YouTube</text>
<text class="s" x="85" y="305">live chat</text>
<rect class="box" x="230" y="20" width="230" height="120" rx="4"/>
<rect class="c1" x="230" y="20" width="230" height="120" rx="4"/>
<text class="b" x="345" y="46">main.py</text>
<text x="345" y="68">supervisor · polls every 60s</text>
<text class="s" x="345" y="90">indexers → list of live streams</text>
<text class="s" x="345" y="108">process manager</text>
<text class="s" x="345" y="125">(tmux panes or subprocesses)</text>
<rect class="box" x="242" y="238" width="230" height="110" rx="4"/>
<rect class="box" x="236" y="244" width="230" height="110" rx="4"/>
<rect class="box" x="230" y="250" width="230" height="110" rx="4"/>
<rect class="c1" x="230" y="250" width="230" height="110" rx="4"/>
<text class="b" x="345" y="276">scrape.py × N</text>
<text x="345" y="298">one process per live stream</text>
<text class="s" x="345" y="320">every message → every writer</text>
<text class="s" x="345" y="338">retries · flushes on exit</text>
<rect class="box" x="540" y="20" width="170" height="340" rx="4"/>
<text class="b" x="625" y="42">storage</text>
<rect class="box" x="555" y="56" width="140" height="96" rx="4"/>
<rect class="c2" x="555" y="56" width="140" height="96" rx="4"/>
<text class="b" x="625" y="78">MySQL</text>
<text class="s" x="625" y="98">chat_tab_0 … _29</text>
<text class="s" x="625" y="116">stream_tab</text>
<text class="s" x="625" y="136">(optional)</text>
<rect class="box" x="555" y="166" width="140" height="86" rx="4"/>
<rect class="c2" x="555" y="166" width="140" height="86" rx="4"/>
<text class="b" x="625" y="188">local files</text>
<text class="s" x="625" y="208">simple/&lt;id&gt;.txt</text>
<text class="s" x="625" y="226">metadata/&lt;id&gt;.json</text>
<text class="s" x="625" y="243">(optional)</text>
<rect class="box" x="555" y="266" width="140" height="80" rx="4"/>
<text class="b" x="625" y="288">logs</text>
<text class="s" x="625" y="308">&lt;id&gt;.log · main.log</text>
<text class="s" x="625" y="326">size-rotated</text>
<line class="ln" x1="160" y1="68" x2="228" y2="68" marker-end="url(#hs-a1)"/>
<text class="s" x="194" y="60">GET /live</text>
<line class="ln" x1="345" y1="140" x2="345" y2="235" marker-end="url(#hs-a1)"/>
<text class="s l" x="355" y="184">spawn one per</text>
<text class="s l" x="355" y="198">new stream</text>
<line class="ln" x1="160" y1="290" x2="228" y2="290" marker-end="url(#hs-a1)"/>
<text class="s" x="194" y="282">pytchat</text>
<line class="ln" x1="460" y1="100" x2="538" y2="100" marker-end="url(#hs-a1)"/>
<text class="s" x="499" y="78">stream</text>
<text class="s" x="499" y="92">metadata</text>
<line class="ln" x1="460" y1="305" x2="538" y2="305" marker-end="url(#hs-a1)"/>
<text class="s" x="499" y="283">chat</text>
<text class="s" x="499" y="297">messages</text>
</svg>
</div>
<div class="hs-cap">The two programs and where their data goes.</div>

There are two programs. <b>main.py</b> is the supervisor: every <code>poll_interval</code> seconds (60 by default) it asks each configured indexer for live streams, records their metadata, and makes sure each one has a scraper running. <b>scrape.py</b> scrapes exactly one video. It is a normal command-line program, so it can also be run on its own: <code>python3 scrape.py &lt;video_id&gt; [max_messages] [max_seconds]</code>.
<br><br>
Running one process per stream is the main design decision. A crash or hang in one stream's chat only takes down that stream's scraper; the supervisor notices on its next poll and starts a new one. It also spreads the work over every core without any threading in the scraper itself.
<br><br>
The supervisor talks to its scrapers through a small process-manager interface (<code>spawn</code>, <code>is_active</code>, <code>remove</code>, <code>tracked_urls</code>, <code>kill_all</code>) with two implementations:
<br><br>
<b>tmux (default)</b> - each scraper gets its own pane in a <code>holoscrape</code> tmux session, and the window is re-tiled after every new pane. That tiled window is the visualiser in the screenshot above: attach to the session and you can watch every stream's chat scroll past at once.
<br><br>
<b>subprocess (<code>--no-tmux</code>)</b> - plain child processes with their output discarded, for running under systemd or Docker. On shutdown each child gets SIGTERM, then SIGKILL if it hasn't exited after 5 seconds.
<br><br>

</div>
</details>

<br>
<details open>
<summary style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px; cursor: pointer;">The poll loop</summary>
<div class="content">

<div class="hs-wrap">
<svg class="hs-dia" viewBox="0 0 720 560" role="img" aria-label="Poll loop: ask indexers, filter, write stream metadata, reconcile with tracked scrapers (forget finished, respawn dead, spawn new up to the cap), sleep, repeat">
<defs><marker id="hs-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<rect class="box" x="180" y="20" width="360" height="54" rx="4"/>
<text class="b" x="360" y="42">1 · ask every indexer</text>
<text class="s" x="360" y="61">Holodex /live, once per configured org</text>
<rect class="box" x="180" y="96" width="360" height="66" rx="4"/>
<text class="b" x="360" y="117">2 · filter</text>
<text class="s" x="360" y="136">drop placeholders, non-live and members-only streams</text>
<text class="s" x="360" y="152">optional channel-name filter, e.g. "EN"</text>
<rect class="box" x="180" y="184" width="360" height="54" rx="4"/>
<text class="b" x="360" y="206">3 · write stream metadata</text>
<text class="s" x="360" y="225">every live stream, every poll</text>
<rect class="box" x="180" y="260" width="360" height="54" rx="4"/>
<rect class="c1" x="180" y="260" width="360" height="54" rx="4"/>
<text class="b" x="360" y="282">4 · reconcile with tracked scrapers</text>
<text class="s" x="360" y="301">compare this poll's video IDs with running scrapers</text>
<rect class="box" x="20" y="360" width="220" height="86" rx="4"/>
<text class="b" x="130" y="382">gone from results</text>
<text class="s" x="130" y="402">stop tracking it; the scraper</text>
<text class="s" x="130" y="418">ends by itself when the</text>
<text class="s" x="130" y="434">chat finishes</text>
<rect class="box" x="250" y="360" width="220" height="86" rx="4"/>
<text class="b" x="360" y="382">still live, scraper dead</text>
<text class="s" x="360" y="402">respawn it</text>
<rect class="box" x="480" y="360" width="220" height="86" rx="4"/>
<text class="b" x="590" y="382">new stream</text>
<text class="s" x="590" y="402">spawn a scraper, up to</text>
<text class="s" x="590" y="418">max_concurrent_streams;</text>
<text class="s" x="590" y="434">the rest wait a poll</text>
<rect class="box" x="180" y="490" width="360" height="50" rx="4"/>
<text class="b" x="360" y="520">5 · sleep poll_interval</text>
<line class="ln" x1="360" y1="74" x2="360" y2="94" marker-end="url(#hs-a2)"/>
<line class="ln" x1="360" y1="162" x2="360" y2="182" marker-end="url(#hs-a2)"/>
<line class="ln" x1="360" y1="238" x2="360" y2="258" marker-end="url(#hs-a2)"/>
<path class="ln" d="M360,314 V334 M130,334 H590 M130,334 V357 M360,334 V357 M590,334 V357"/>
<path class="ah" d="M126,350 L130,358 L134,350 z M356,350 L360,358 L364,350 z M586,350 L590,358 L594,350 z"/>
<path class="ln" d="M130,446 V468 M360,446 V468 M590,446 V468 M130,468 H590 M360,468 V487"/>
<path class="ah" d="M356,480 L360,488 L364,480 z"/>
<path class="ln" d="M180,515 H8 V47 H177" marker-end="url(#hs-a2)"/>
<text class="s" x="14" y="290" transform="rotate(-90 14 290)">next poll</text>
</svg>
</div>
<div class="hs-cap">One pass of the supervisor's loop.</div>

The Holodex indexer asks the API for everything live in one organisation (<code>type=placeholder,stream</code>) and throws away scheduled placeholders, anything not actually live, and members-only streams (their chat can't be read without a membership). An optional substring filter on the channel name is how "Nijisanji, but only EN" works. Each organisation is just another entry in the config's <code>indexers</code> list.
<br><br>
A few behaviours fall out of the loop rather than being separate features:
<br><br>
<b>The supervisor never stops a scraper.</b> When a stream disappears from Holodex it just stops tracking it. The scraper decides for itself when the chat is over, so a stream that Holodex marks as ended a little early doesn't lose its last minutes of chat.
<br><br>
<b>Dead scrapers are respawned on the next poll.</b> A scraper that crashed while its stream is still live looks exactly like a new stream, so it gets a fresh process within one poll interval.
<br><br>
<b>The concurrency cap is a soft queue.</b> Streams over <code>max_concurrent_streams</code> (10 by default) aren't stored anywhere; they are simply still live on the next poll and get picked up once a slot frees.
<br><br>
SIGTERM or SIGINT ends the loop after the current pass, then the supervisor stops every scraper and closes its own writers.
<br><br>

</div>
</details>

<br>
<details open>
<summary style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px; cursor: pointer;">The scraper</summary>
<div class="content">

<div class="hs-wrap">
<svg class="hs-dia" viewBox="0 0 720 330" role="img" aria-label="Scraper lifecycle: connect (retrying invalid IDs with backoff), read chat every second, reconnect with backoff on connection loss, and finalise writers when the chat finishes, the stream turns into a replay, a stop limit is hit, or after five failed reconnects">
<defs><marker id="hs-a3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<rect class="box" x="10" y="110" width="150" height="70" rx="4"/>
<text class="b" x="85" y="138">connect</text>
<text class="s" x="85" y="158">pytchat.create()</text>
<path class="ln" d="M55,110 C55,72 115,72 115,107" marker-end="url(#hs-a3)"/>
<text class="s" x="85" y="44">invalid ID: retry,</text>
<text class="s" x="85" y="58">2 s → 32 s backoff</text>
<rect class="box" x="240" y="90" width="220" height="110" rx="4"/>
<rect class="c1" x="240" y="90" width="220" height="110" rx="4"/>
<text class="b" x="350" y="118">read chat</text>
<text class="s" x="350" y="140">fetch new messages every second</text>
<text class="s" x="350" y="158">each message → every writer</text>
<text class="s" x="350" y="176">check stop limits</text>
<rect class="box" x="560" y="110" width="150" height="70" rx="4"/>
<rect class="c2" x="560" y="110" width="150" height="70" rx="4"/>
<text class="b" x="635" y="138">finalise</text>
<text class="s" x="635" y="158">flush + close writers</text>
<rect class="box" x="240" y="250" width="220" height="64" rx="4"/>
<text class="b" x="350" y="274">reconnect</text>
<text class="s" x="350" y="294">wait 2·2ⁿ s, up to 5 tries</text>
<line class="ln" x1="160" y1="145" x2="238" y2="145" marker-end="url(#hs-a3)"/>
<line class="ln" x1="460" y1="145" x2="558" y2="145" marker-end="url(#hs-a3)"/>
<text class="s" x="509" y="98">chat finished,</text>
<text class="s" x="509" y="112">replay, stop</text>
<text class="s" x="509" y="126">limit or SIGTERM</text>
<line class="ln" x1="300" y1="200" x2="300" y2="248" marker-end="url(#hs-a3)"/>
<text class="s r" x="292" y="229">connection lost</text>
<line class="ln" x1="400" y1="250" x2="400" y2="202" marker-end="url(#hs-a3)"/>
<text class="s l" x="408" y="229">reconnected</text>
<path class="ln" d="M460,282 H635 V183" marker-end="url(#hs-a3)"/>
<text class="s" x="548" y="274">gave up</text>
</svg>
</div>
<div class="hs-cap">The life of one scrape.py process.</div>

The scraper is built on <a href="https://github.com/taizan-hokuto/pytchat">pytchat</a>, which reads a live chat without the YouTube Data API or its quota. It fetches new messages once a second and passes each one to every enabled writer.
<br><br>
The important part is telling "the stream ended" apart from "the connection broke". When the chat stops, the scraper asks pytchat why: a finished chat or a stream that has turned into a replay is a clean end; anything else is treated as a dropped connection and retried with exponential backoff (2, 4, 8, 16, 32 seconds). An "invalid video ID" error on the first connect is retried with the same backoff before the scraper gives up.
<br><br>
Optional message-count and duration limits, plus SIGTERM/SIGINT, stop the scraper early. However it stops, it always finalises its writers so nothing buffered is lost.
<br><br>

</div>
</details>

<br>
<details open>
<summary style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px; cursor: pointer;">Storage</summary>
<div class="content">

Output goes through <b>writers</b>, and each one is switched on by a config flag. Every scraper creates its own writer instances for its video. The supervisor also holds one instance of each with no video attached, and only uses it to save stream metadata.
<br><br>

<b>MySQL</b><br>
<div class="hs-wrap">
<svg class="hs-dia" viewBox="0 0 720 290" role="img" aria-label="Two hosts scraping the same video both hash the video ID to the same shard table and REPLACE rows keyed on chat_id, so duplicates collapse into one row">
<defs><marker id="hs-a4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0,0 L10,5 L0,10 z"/></marker></defs>
<rect class="box" x="10" y="40" width="170" height="60" rx="4"/>
<rect class="c1" x="10" y="40" width="170" height="60" rx="4"/>
<text class="b" x="95" y="65">host A</text>
<text class="s" x="95" y="85">scrape.py · video X</text>
<rect class="box" x="10" y="170" width="170" height="60" rx="4"/>
<rect class="c1" x="10" y="170" width="170" height="60" rx="4"/>
<text class="b" x="95" y="195">host B</text>
<text class="s" x="95" y="215">scrape.py · video X</text>
<rect class="box" x="255" y="95" width="190" height="80" rx="4"/>
<text class="b" x="350" y="120">pick the shard</text>
<text class="s" x="350" y="140">sha1(video_id), first 8 hex</text>
<text class="s" x="350" y="158">mod 30 → e.g. 17</text>
<rect class="box" x="520" y="30" width="190" height="220" rx="4"/>
<rect class="c2" x="520" y="30" width="190" height="220" rx="4"/>
<text class="b" x="615" y="54">chat_tab_17</text>
<line class="ln" x1="520" y1="66" x2="710" y2="66"/>
<text class="s" x="615" y="88">chat_id (primary key)</text>
<text class="s" x="615" y="106">video_id</text>
<text class="s" x="615" y="124">text · timestamp</text>
<text class="s" x="615" y="142">author_name · author_id</text>
<text class="s" x="615" y="160">source = hostname</text>
<line class="ln" x1="520" y1="176" x2="710" y2="176"/>
<text class="s" x="615" y="198">same chat_id twice</text>
<text class="s" x="615" y="216">→ one row,</text>
<text class="s" x="615" y="234">last writer wins</text>
<line class="ln" x1="180" y1="75" x2="253" y2="118" marker-end="url(#hs-a4)"/>
<line class="ln" x1="180" y1="200" x2="253" y2="155" marker-end="url(#hs-a4)"/>
<line class="ln" x1="445" y1="135" x2="518" y2="135" marker-end="url(#hs-a4)"/>
<text class="s" x="481" y="127">REPLACE</text>
<text class="s" x="350" y="214">each scraper flushes a randomly</text>
<text class="s" x="350" y="230">sized batch of 30-100 messages</text>
</svg>
</div>
<div class="hs-cap">How chat rows are spread across tables, and why duplicates are harmless.</div>

Chat messages are split across 30 identically shaped tables, <code>chat_tab_0</code> to <code>chat_tab_29</code>. The table is chosen from a SHA-1 hash of the video ID, so a whole stream always lands in one table and reading it back never touches the others. A small script, <code>resources/generate_init_sql.py</code>, generates the schema for any shard count.
<br><br>
Rows are written with <code>REPLACE INTO</code> keyed on YouTube's own chat ID, which makes every write idempotent. That is what lets several machines scrape the same stream for redundancy: their copies of a message collapse into one row, and the <code>source</code> column records which host wrote it last.
<br><br>
Messages are buffered and written in batches, and each scraper picks a new random batch size between 30 and 100 after every flush. With a dozen scrapers sharing one database, this stops them all committing in lockstep.
<br><br>
Stream metadata (title, topic, channel) goes into <code>stream_tab</code>, again with <code>REPLACE</code>. It is written on every poll, so a title changed mid-stream ends up current.
<br><br>

<b>Local files</b><br>
The filesystem writer is the zero-setup option. Each stream gets <code>simple/&lt;video_id&gt;.txt</code> with one line per message (video ID, chat ID, time, text), flushed every 10 messages. It also gets <code>metadata/&lt;video_id&gt;.json</code>, the raw Holodex record as first seen.
<br><br>

<b>Logs</b><br>
Every scraper logs to its own file, <code>&lt;video_id&gt;.log</code>, and the supervisor logs to <code>main.log</code>. Each file rotates at 10 MB with 5 backups, and can be plain text or JSON lines.
<br><br>

</div>
</details>

<br>
<details open>
<summary style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px; cursor: pointer;">Extending and configuring</summary>
<div class="content">

Both ends are abstract base classes. An <b>Indexer</b> implements one method, <code>get_streams()</code>, returning dicts with at least a video <code>id</code>, a <code>title</code> and a <code>channel</code>. A <b>Writer</b> implements <code>check_config_enabled()</code> and <code>process(chat)</code>, and can override <code>process_stream()</code> for metadata and <code>finalise()</code> for cleanup. Adding a new source or backend means writing a subclass and registering it where main.py (and, for writers, scrape.py) builds its list.
<br><br>
Configuration is one JSON file, found through <code>$HOLOSCRAPE_CONFIG</code>, the working directory, or the project root. Secrets stay out of it: the Holodex key and database password come from <code>HOLODEX_API_KEY</code> and <code>HOLOSCRAPE_DB_PASSWORD</code>. Every field has a default, and the config is validated before anything starts. Turning on the database without its connection settings, for example, prints every problem at once instead of failing halfway through a stream.
<br><br>

</div>
</details>

<br>
<details open>
<summary style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px; cursor: pointer;">Testing</summary>
<div class="content">

There are 50 pytest tests covering config parsing and validation, the indexer's filtering, logging, the scraper's stop and retry logic, and both writers. GitHub Actions runs them on Python 3.12, 3.13 and 3.14 against a real MySQL 8 service container. An end-to-end test scrapes a real live stream through the live Holodex API, using a key stored as a repository secret. It skips itself when there is no key, no database, or nothing live at the time.
<br><br>

</div>
</details>
