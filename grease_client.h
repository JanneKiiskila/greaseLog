/*
 * grease_log.h
 *
 *  Created on: Apr 2, 2015
 *      Author: ed
 * (c) 2015, WigWag Inc.
 */
#ifndef GREASE_LOG_H_
#define GREASE_LOG_H_

#include <string.h>  // for memcmp memcpy

#ifdef __cplusplus
extern "C" {
#endif

#define GREASE_MAX_MESSAGE_SIZE 65535

#define SINK_LOG_PREAMBLE ((uint32_t)0xF00DFEED)
#define SIZEOF_SINK_LOG_PREAMBLE (sizeof(uint32_t))
#define IS_SINK_PREAMBLE(p) (memcmp(p,&__grease_preamble,SIZEOF_SINK_LOG_PREAMBLE) == 0)
#define GET_SIZE_FROM_PREAMBLE(p,d) (memcpy(&(d),((char *)(p))+(sizeof(uint32_t)),sizeof(uint32_t)))
#define GREASE_CLIENT_HEADER_SIZE (SIZEOF_SINK_LOG_PREAMBLE + sizeof(uint32_t))
#define GREASE_TOTAL_MSG_SIZE(len) (len + GREASE_CLIENT_HEADER_SIZE)
#define GREASE_RAWBUF_MIN_SIZE (GREASE_CLIENT_HEADER_SIZE + (sizeof(logMeta) + (sizeof(uint32_t))) )

typedef uint64_t FilterHash;   // format: [N1N2] where N1 is [Tag id] and N2 is [Origin Id]
typedef uint32_t FilterId;     // filter id is always > 0
typedef uint32_t TargetId;     // id is always > 0
typedef uint32_t SinkId;     // id is always > 0
typedef uint32_t OriginId;     // id is always > 0
typedef uint32_t TagId;        // id is always > 0
typedef uint32_t LevelMask;    // id is always > 0
typedef uint32_t RawLogLen;    // len of a raw log buffer into a sink

typedef struct logMeta_t {   // meta data for each log entry
	int32_t tag;    // 0 means no tag
	uint32_t level;  // 0 means no level
	int32_t origin; // 0 means no origin
	uint32_t target; // 0 means default target
} logMeta;

#define GREASE_OVERFLOW 4
#define GREASE_INVALID_PARAMS 3
#define GREASE_NO_BUFFER 2
#define GREASE_FAILED 1
#define GREASE_OK 0

extern const logMeta __noMetaData;
extern const uint32_t __grease_preamble;

/**
 * create a log entry for use across the network to Grease
 * @param f
 * @param s
 * @param len
 * @param tobuf A raw buffer to store the log output ready for processing
 * @param buflen A pointer to an int. This will be read to know the existing length of the buffer, and then set
 * the size of the buffer that should be sent
 * @return returns GREASE_OK if successful, or GREASE_NO_BUFFER if the buffer is too small. If parameters are
 * invalid returns GREASE_INVALID_PARAMS
 */
extern int grease_logToRaw(logMeta *f, char *s, int len, char *tobuf, int *buflen);

/**
 * sets up the logger if using a local (in process) Grease server
 * @return GREASE_OK if successful, or GREASE_FAILED if not
 */
extern int grease_initLogger(void);

/**
 * logs to local, in process Grease server
 * @param f
 * @param s
 * @param len
 * @param tobuf
 * @param len
 */
extern void grease_logLocal(logMeta *f, char *s, RawLogLen len, char *tobuf, int *buflen);


#ifdef __cplusplus
};
#endif

#endif /* GREASE_LOG_H_ */
